import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Heart3D({ leaving }: { leaving: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const leavingRef = useRef(leaving)
  const leaveStarted = useRef(0)

  useEffect(() => {
    if (leaving && !leavingRef.current) leaveStarted.current = performance.now()
    leavingRef.current = leaving
  }, [leaving])

  useEffect(() => {
    const container = host.current
    if (!container) return

    const mobile = window.matchMedia('(max-width: 700px)').matches
    const count = mobile ? 700 : 1500
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.7))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 48
    const positions = new Float32Array(count * 3)
    const heart = new Float32Array(count * 3)
    const scatter = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const gold = new THREE.Color('#f0cf78')
    const diamond = new THREE.Color('#fffaf0')

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const fill = Math.sqrt(Math.random())
      const x = 16 * Math.pow(Math.sin(angle), 3) * fill
      const y = (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * fill
      const depth = (Math.random() - .5) * (5.5 - fill * 3)
      const index = i * 3
      heart[index] = x * .74
      heart[index + 1] = y * .74 + 1
      heart[index + 2] = depth
      positions[index] = heart[index]
      positions[index + 1] = heart[index + 1]
      positions[index + 2] = heart[index + 2]
      const distance = 28 + Math.random() * 35
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      scatter[index] = Math.sin(phi) * Math.cos(theta) * distance
      scatter[index + 1] = Math.sin(phi) * Math.sin(theta) * distance
      scatter[index + 2] = Math.cos(phi) * distance
      const colorRoll = Math.random()
      const hue = ((angle / (Math.PI * 2)) + depth * .018 + fill * .12 + 1) % 1
      const color = colorRoll > .92
        ? diamond
        : colorRoll > .82
          ? gold
          : new THREE.Color().setHSL(hue, .82, .62)
      colors[index] = color.r
      colors[index + 1] = color.g
      colors[index + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({ size: mobile ? .19 : .16, vertexColors: true, transparent: true, opacity: .92, blending: THREE.AdditiveBlending, depthWrite: false })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    let frame = 0
    const started = performance.now()
    const animate = (now: number) => {
      const elapsed = (now - started) / 1000
      const burst = leavingRef.current ? Math.min(1, (now - leaveStarted.current) / 1250) : 0
      const eased = 1 - Math.pow(1 - burst, 3)
      const attribute = geometry.attributes.position as THREE.BufferAttribute
      const array = attribute.array as Float32Array
      for (let i = 0; i < count * 3; i += 1) array[i] = heart[i] + (scatter[i] - heart[i]) * eased
      attribute.needsUpdate = true
      points.rotation.y = Math.sin(elapsed * .65) * .22 + elapsed * .055
      points.rotation.z = Math.sin(elapsed * .8) * .025
      const pulse = 1 + Math.sin(elapsed * 2.2) * .025
      points.scale.setScalar(pulse + eased * .18)
      material.opacity = .9 * (1 - eased)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="heart-3d" ref={host} aria-hidden="true" />
}
