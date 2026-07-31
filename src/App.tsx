import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import './App.css'

import hero1 from './img/hero-sharp.jpg'
import hero2 from './img/2aOboQnzQtk5LBvsUuy0tRnDWDYP3VZQf2eOmqHI.jpg'
import hero3 from './img/2aOboQnzQtk5LBvsUuy0tRmCzkq5iCFDi4VaE1Ca.jpg'
import hero4 from './img/2aOboQnzQtmOrfUFCAXHhKZPEpnmrLBmLIS0MF3w.jpg'
import groom from './img/2aOboQnzQtxtcPNJg0dG25eypBPOg6y9NBReGHOC.jpg'
import bride from './img/2aOboQnzQyYOS6u4SeMRw8QYi8OAYh1KCELkIJto.jpg'
import g1 from './img/2aOboQnzPL6gwV4GZl4SEuAyFyBCTuzYH8KDZw5g.jpg'
import g2 from './img/2aOboQnzQvMDM0tJ2pXX9d4xMaDgJL1awuwIdd7A.jpg'
import g3 from './img/2aOboQnzQyptOYr8xGBeQStZ0uiOsFjtyFfmqsfw.jpg'
import g4 from './img/2aOboQnzR1qoKqd6uU9jwEWeQDlP90CEnFZ6NBLs.jpg'
import g5 from './img/2aOboQnzQzt3xIqo19yxYKImDBbthgyA2o7GrkQ4.jpg'
import tv1 from './img/2aOboQnzPKVZhEJePKDjg2jl1QNbJcIkXKHtrQ1o.jpg'
import tv2 from './img/2aOboQnzPKVZhEJePKDjg2qJbVHkKOAGqkyQ4uEy.jpg'
import tv3 from './img/2aOboQnzPLLD0VSWoaT8ZcQJduUzHUSOnhcVUkJk.jpg'
import tv4 from './img/2aOboQnzQuD7TCiOyZlNYsEhbEI83nj0cdTzUXAG.jpg'
import tv5 from './img/2aOboQnzQvYt5P1kctrEoVHCLtbTQVD1SpMKJEsC.jpg'
import tv6 from './img/2aOboQnzQvmhMcTBnzWTx9KvRx11nYERSuTJn3aq.jpg'
import tv7 from './img/2aOboQnzQy52rWaVxKZYW0t4rSMYsckxIemPOkhE.jpg'
import tv8 from './img/2aOboQnzQyI23UFzZ3smva1lA1DT6OIHhQkCTw8G.jpg'
import tv9 from './img/2aOboQnzR079GGstihlXbKeUOdLQ4y7rdigpgVMG.jpg'

const GROOM = 'Văn Tuấn'
const BRIDE = 'Xuân Mai'
const TV_MODE = new URLSearchParams(window.location.search).get('tv') === '1'
const heroes = [hero1, hero2, hero3, hero4]
const photos = [g1, g2, g3, g4, g5, hero2, hero3]
const tvPhotos = [hero1, hero2, hero3, hero4, g1, g2, g3, g4, g5, groom, bride, tv1, tv2, tv3, tv4, tv5, tv6, tv7, tv8, tv9]
const tvSlides = [
  [hero4],
  [hero1, hero2],
  [hero3, g1],
  [g2, g3],
  [g4, g5],
  [groom, bride],
  [tv1, tv2],
  [tv3, tv4],
  [tv5, tv6],
  [tv7, tv8],
  [tv9, hero1],
]
const timeline = [
  ['Lần đầu gặp nhau', 'Khoảnh khắc hai đứa gặp nhau, có điều gì đó đã thay đổi mà cả hai chưa kịp nhận ra.'],
  ['Cùng bàn, cùng mộng', 'Những tháng ngày thanh xuân, cùng học, cùng mơ và bắt đầu hiểu nhau hơn bất kỳ ai.'],
  ['Chính thức yêu nhau', 'Từ hôm đó, anh là của em và em là của anh.'],
  ['Trưởng thành cùng nhau', 'Hai con đường học tập, nhưng vẫn chung một thành phố để tìm về nhau.'],
  ['Vượt qua khoảng cách', 'Tình yêu không chọn dễ dàng — tình yêu chọn bền bỉ. Và chúng mình vẫn chọn nhau.'],
  ['Về nhà cùng nhau', 'Hôm nay, chúng mình quyết định cùng bước vào chương đẹp nhất của cuộc đời.'],
]

function getCountdown() {
  const distance = Math.max(0, new Date('2026-08-07T09:00:00+07:00').getTime() - Date.now())
  return {
    Ngày: Math.floor(distance / 86400000),
    Giờ: Math.floor((distance / 3600000) % 24),
    Phút: Math.floor((distance / 60000) % 60),
    Giây: Math.floor((distance / 1000) % 60),
  }
}

function App() {
  const heroPhotos = TV_MODE ? tvPhotos : heroes
  const slideCount = TV_MODE ? tvSlides.length : heroPhotos.length
  const [opened, setOpened] = useState(TV_MODE)
  const [opening, setOpening] = useState(false)
  const [slide, setSlide] = useState(0)
  const [gallery, setGallery] = useState(0)
  const [time, setTime] = useState(getCountdown)
  const [music, setMusic] = useState(false)
  const [showTvIntro, setShowTvIntro] = useState(true)
  const [wish, setWish] = useState({ name: '', message: '' })
  const [wishes, setWishes] = useState<{ name: string; message: string }[]>([])
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    if (!opened) return
    const timer = window.setInterval(() => setSlide(value => (value + 1) % slideCount), TV_MODE ? 8000 : 5000)
    return () => window.clearInterval(timer)
  }, [opened, slideCount])
  useEffect(() => {
    if (!TV_MODE) return
    const timer = window.setTimeout(() => setShowTvIntro(false), 7800)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!opened) return
    const timer = window.setInterval(() => setGallery(value => (value + 1) % photos.length), 3000)
    return () => window.clearInterval(timer)
  }, [opened])
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.rise').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [opened])
  useEffect(() => {
    if (!TV_MODE || !opened) return
    document.body.classList.add('tv-mode')
    return () => document.body.classList.remove('tv-mode')
  }, [opened])

  const openInvitation = () => {
    setOpening(true)
    window.setTimeout(() => {
      setOpened(true)
      window.setTimeout(() => setOpening(false), 900)
    }, 700)
  }
  const toggleMusic = () => {
    const player = audio.current
    if (!player) return
    if (music) player.pause()
    else player.play().catch(() => undefined)
    setMusic(!music)
  }
  const submitWish = (event: FormEvent) => {
    event.preventDefault()
    if (!wish.name.trim() || !wish.message.trim()) return
    setWishes(current => [{ name: wish.name.trim(), message: wish.message.trim() }, ...current])
    setWish({ name: '', message: '' })
  }

  if (!opened) {
    return (
      <div className={`invitation-cover ${opening ? 'opening' : ''}`}>
        <img className="cover-photo" src={hero1} alt="" />
        <div className="cover-glow" />
        <div className="film-grain" />
        <div className="cover-content">
          <div className="opening-card">
            <div className="opening-crest">囍</div>
            <p className="film-presents">TRÂN TRỌNG KÍNH MỜI</p>
            <div className="ornament"><i />✦<i /></div>
            <div className="cover-names"><h1>{GROOM}</h1><b>&</b><h1>{BRIDE}</h1></div>
            <div className="cover-date"><i />07 . 08 . 2026<i /></div>
            <p className="opening-place">HÀ NỘI · VIỆT NAM</p>
            <button className="open-invitation" onClick={openInvitation} disabled={opening}>
              <span>{opening ? 'ĐANG MỞ...' : 'MỞ THIỆP'}</span><b>→</b>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className={TV_MODE ? 'tv-presentation' : ''}>
      <div className="progress" />
      <audio ref={audio} loop />
      <button className={`music ${music ? 'playing' : ''}`} onClick={toggleMusic} aria-label="Bật hoặc tắt nhạc">{music ? '♫' : '▶'}</button>

      <section className="hero">
        <div className="film-grain" />
        <div className="letterbox top" /><div className="letterbox bottom" />
        {TV_MODE
          ? tvSlides.map((images, index) => (
            <div className={`tv-slide ${images.length > 1 ? 'portrait-pair' : 'landscape-single'} ${index === slide ? 'active' : ''}`} key={images.join('-')}>
              {images.map((src, imageIndex) => (
                <figure key={src}>
                  <img src={src} alt={`Ảnh cưới Văn Tuấn và Xuân Mai ${index + 1}.${imageIndex + 1}`} />
                </figure>
              ))}
            </div>
          ))
          : heroPhotos.map((src, index) => <img className={`${index === slide ? 'active' : ''} shot-${index + 1}`} src={src} alt="" key={src} />)}
        <div className="hero-overlay" />
        <div className={`hero-content ${TV_MODE && !showTvIntro ? 'tv-intro-hidden' : ''}`} key={TV_MODE ? 'tv-copy' : `copy-${slide}`}>
          <small>THE WEDDING OF</small>
          <div className="hero-title">
            <div className="name-reveal"><h1>{GROOM}</h1></div>
            <b>&</b>
            <div className="name-reveal second"><h1>{BRIDE}</h1></div>
          </div>
          <p>07 . 08 . 2026</p>
        </div>
        <div className="film-meta"><span>VĂN TUẤN</span><span>HÀ NỘI · VIỆT NAM</span><span>XUÂN MAI</span></div>
        <div className="slide-dots">{Array.from({ length: slideCount }, (_, i) => <button className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} key={i} />)}</div>
      </section>

      <section className="countdown dark-section">
        <SectionTitle eyebrow="Đếm ngược" title="Còn bao lâu nữa thôi..." dark />
        <div className="count-grid">
          {Object.entries(time).map(([label, value], i) => (
            <div className="count rise" key={label} style={{ '--delay': `${i * .1}s` } as CSSProperties}>
              <div className="count-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><circle className="gold-ring" cx="50" cy="50" r="44" /></svg><b>{String(value).padStart(2, '0')}</b></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="date-note">07 tháng 08 năm 2026</p>
      </section>

      <section className="story pale-section">
        <SectionTitle eyebrow="Hành trình của chúng mình" title="Câu chuyện tình yêu" />
        <div className="timeline">
          {timeline.map(([title, text], i) => (
            <article className={`timeline-item rise ${i % 2 ? 'right' : 'left'}`} key={title}>
              <span className="timeline-dot" /><div><b className="chapter">CHAPTER {String(i + 1).padStart(2, '0')}</b><small>{i === timeline.length - 1 ? '07 . 08 . 2026' : `${2018 + i}`}</small><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="messages">
        <SectionTitle eyebrow="Lời từ trái tim" title="Lời Yêu Thương" />
        <div className="message-grid">
          <LoveCard role="Chú rể" name={GROOM} image={groom}>Em là điều bất ngờ đẹp nhất mà cuộc đời trao cho anh. Hôm nay và mãi mãi, anh chọn em.</LoveCard>
          <LoveCard role="Cô dâu" name={BRIDE} image={bride}>Có những người bước vào cuộc đời mình và thay đổi tất cả — anh là người đó. Em hạnh phúc được gọi anh là chồng.</LoveCard>
        </div>
      </section>

      <section className="gallery dark-section">
        <SectionTitle eyebrow="Bộ ảnh cưới" title="Khoảnh khắc của chúng mình" dark />
        <div className="filmstrip"><div className="perforations top" /><div className="perforations bottom" />
        <div className="carousel">
          {photos.map((src, index) => {
            let offset = index - gallery
            if (offset > photos.length / 2) offset -= photos.length
            if (offset < -photos.length / 2) offset += photos.length
            if (Math.abs(offset) > 2) return null
            return <button key={src} className={`carousel-photo p${offset + 2}`} onClick={() => setGallery(index)}><img src={src} alt={`Ảnh cưới ${index + 1}`} /></button>
          })}
        </div></div>
      </section>

      <section className="invitation-section">
        <SectionTitle eyebrow="Trân trọng kính mời" title="Thiệp mời" />
        <div className="invite-card rise">
          <header><h2>{GROOM} & {BRIDE}</h2><p>CÙNG HAI GIA ĐÌNH TRÂN TRỌNG THÔNG BÁO</p><em>trân trọng kính mời bạn tham dự lễ cưới của chúng mình</em></header>
          <div className="invite-body">
            <p className="invite-day">✦ THỨ SÁU — 07 THÁNG 08 NĂM 2026 ✦</p>
            <div className="event-columns">
              <Event title="Lễ vu quy" time="09:00 SA" place="Tư gia nhà gái" address="Hà Nội, Việt Nam" />
              <Event title="Lễ thành hôn" time="11:30 SA" place="Tư gia nhà trai" address="Hà Nội, Việt Nam" />
            </div>
          </div>
          <a href="https://maps.google.com" target="_blank">XEM BẢN ĐỒ →</a>
        </div>
      </section>

      <section className="wishes">
        <SectionTitle eyebrow="Lời yêu thương" title="Sổ lưu bút" />
        <form className="wish-form rise" onSubmit={submitWish}>
          <input required maxLength={50} placeholder="Tên của bạn" value={wish.name} onChange={e => setWish({ ...wish, name: e.target.value })} />
          <textarea required maxLength={300} rows={3} placeholder={`Gửi lời chúc đến ${GROOM} & ${BRIDE}...`} value={wish.message} onChange={e => setWish({ ...wish, message: e.target.value })} />
          <button>GỬI</button>
        </form>
        <div className="wish-grid">{wishes.map((item, i) => <article key={i}><p>“{item.message}”</p><i /><h3>{item.name}</h3></article>)}</div>
      </section>

      <footer>
        <div className="ornament"><i />✦<i /></div><p>TRÂN TRỌNG KÍNH MỜI</p>
        <div className="double-happiness"><span>囍</span></div>
        <h2>{GROOM}</h2><b>&</b><h2>{BRIDE}</h2>
        <span>07 . 08 . 2026</span><em>Hẹn gặp lại trong ngày vui của chúng mình.</em>
      </footer>
    </main>
  )
}

function SectionTitle({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return <div className={`section-title rise ${dark ? 'light' : ''}`}><p><span>✦</span>{eyebrow}<span>✦</span></p><h2>{title.split(' ').map((word, i) => <em style={{ '--word-delay': `${i * .06}s` } as CSSProperties} key={`${word}-${i}`}>{word}&nbsp;</em>)}</h2><i /></div>
}

function LoveCard({ role, name, image, children }: { role: string; name: string; image: string; children: string }) {
  return <article className="love-card rise"><i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" /><figure><img src={image} alt={name} /></figure><small>{role}</small><h3>{name}</h3><div className="mini-line">✦</div><blockquote>“{children}”</blockquote></article>
}

function Event({ title, time, place, address }: { title: string; time: string; place: string; address: string }) {
  return <article><span>◇</span><small>{title}</small><h3>{time}</h3><i /><p>{place}</p><em>{address}</em></article>
}

export default App
