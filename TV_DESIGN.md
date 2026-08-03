# Wedding TV — Định hướng thiết kế

## Thông tin

- Cô dâu và chú rể: **Văn Tuấn & Xuân Mai**
- Ngày cưới: **07.08.2026**
- Chế độ trình chiếu: `http://localhost:5173/Wedding/?tv=1`
- Tỷ lệ ưu tiên: **16:9 — 1920 × 1080**

## Tóm tắt dự án

Xây dựng **Website Wedding TV** trình chiếu trên màn hình TV/LED tại sảnh cưới, hoạt động theo phong cách cinematic nhằm tạo trải nghiệm sang trọng và cảm xúc cho khách tham dự. Website tự động phát nhạc, trình chiếu album ảnh theo từng chương của câu chuyện tình yêu với các hiệu ứng chuyển cảnh mượt mà, chạy toàn màn hình, tự động lặp và tối ưu cho màn hình 16:9. Thiết kế sử dụng tông màu đỏ–trắng, ưu tiên ảnh cô dâu chú rể làm trung tâm và đảm bảo hoạt động ổn định trong suốt thời gian diễn ra buổi tiệc.

## Mục tiêu

Trang trình chiếu cần mang cảm giác đám cưới hiện đại, lãng mạn và trang trọng. Ảnh cô dâu chú rể luôn là nội dung chính; hiệu ứng chỉ có nhiệm vụ dẫn dắt cảm xúc, không được lấn át ảnh.

Ba từ khóa thiết kế:

> **Sạch — Lãng mạn — Trang trọng**

## Chức năng

### Chức năng chính

- Hiển thị album ảnh cưới theo từng chương.
- Phát nhạc nền xuyên suốt trình chiếu.
- Tự động chuyển slide theo thời lượng cấu hình.
- Yêu cầu chạy toàn màn hình sau tương tác đầu tiên.
- Tự động quay lại phần mở đầu sau màn kết.
- Hỗ trợ chế độ TV bằng tham số `?tv=1`.
- Hiển thị nút bật nhạc khi trình duyệt chặn autoplay.
- Tạm dừng hoặc loại bỏ animation của slide không hoạt động.
- Hỗ trợ điều khiển slide thủ công khi cần kiểm tra.

### Chức năng dữ liệu

- Nội dung đám cưới, chương, caption, ảnh và nhạc có thể được tách khỏi mã giao diện.
- Hướng phát triển ưu tiên: tải cấu hình từ một file JSON cục bộ.
- Dữ liệu phải có giá trị mặc định để trình chiếu vẫn hoạt động khi file cấu hình lỗi.
- Ảnh và nhạc phải được kiểm tra trước khi bắt đầu vòng trình chiếu.

## Yêu cầu UI

- Không để caption, monogram hoặc hiệu ứng che mặt cô dâu chú rể.
- Chữ phải đọc được từ khoảng cách khoảng 5–10 m trên màn hình TV/LED.
- Kích thước chữ không phụ thuộc hoàn toàn vào độ phân giải màn hình.
- Độ tương phản giữa chữ và nền phải đủ cao trong mọi slide.
- Hiệu ứng không gây rối mắt hoặc cạnh tranh với ảnh.
- Bố cục cần có nhiều khoảng thở.
- Ảnh cưới luôn là trung tâm thị giác.
- Khuôn mặt, váy cưới và các chi tiết quan trọng không bị cắt sai.
- Nội dung quan trọng nằm trong vùng an toàn, cách mép màn hình tối thiểu 5–6%.
- Giao diện không hiển thị thanh cuộn, con trỏ hoặc thành phần điều khiển không cần thiết trong TV Mode.
- Bố cục phải sử dụng tốt trên tỷ lệ 16:9 và có phương án thích ứng cho màn hình nhỏ.

## Yêu cầu animation

- Mục tiêu tốc độ khung hình: **60 FPS** trên thiết bị trình chiếu mục tiêu.
- Chuyển cảnh phải mượt, không nhảy bố cục.
- Không xảy ra giật hình hoặc drop frame dễ nhận thấy.
- Chỉ chạy animation nặng trên slide hiện tại.
- Animation của slide cũ phải dừng sau khi chuyển cảnh kết thúc.
- Ưu tiên `transform` và `opacity`; hạn chế animation thuộc tính gây layout hoặc repaint lớn.
- WebGL phải được tải riêng và giải phóng tài nguyên khi không còn sử dụng.
- Giảm số lượng hạt, bokeh và chất lượng render trên thiết bị yếu hoặc màn hình nhỏ.
- Hỗ trợ `prefers-reduced-motion` bằng phiên bản chuyển cảnh tối giản.
- Nhịp animation phải phù hợp nhạc nền, không chuyển ảnh giữa câu nhạc.

## Cấu trúc dữ liệu

```text
Wedding
├── Bride
│   ├── Name
│   └── Portrait
├── Groom
│   ├── Name
│   └── Portrait
├── Date
├── Location
├── Music[]
├── Opening
│   ├── Title
│   ├── Subtitle
│   └── HeroImage
├── Chapters[]
│   ├── Title
│   ├── Caption
│   └── Slides[]
│       ├── Images[]
│       ├── Eyebrow
│       ├── Caption
│       └── Duration
└── Ending
    ├── Title
    ├── Message
    ├── Image
    └── Duration
```

Ví dụ cấu hình JSON định hướng:

```json
{
  "bride": { "name": "Xuân Mai", "portrait": "bride.jpg" },
  "groom": { "name": "Văn Tuấn", "portrait": "groom.jpg" },
  "date": "2026-08-07",
  "music": ["cuoi-thoi.mp3"],
  "chapters": [
    {
      "title": "Duyên gặp gỡ",
      "caption": "Chuyện của chúng mình",
      "slides": [
        {
          "images": ["photo-01.jpg", "photo-02.jpg"],
          "eyebrow": "Hữu duyên tương ngộ",
          "caption": "Giữa muôn người, ta tìm thấy nhau",
          "duration": 10000
        }
      ]
    }
  ]
}
```

## Luồng hoạt động

```text
Loading
   ↓
Opening
   ↓
Curtain Reveal
   ↓
Hero
   ↓
Story — Chương I
   ↓
Story — Chương II
   ↓
Story — Chương III
   ↓
Ending
   ↓
Loop về Opening
```

Chi tiết:

1. **Loading:** tải cấu hình, ảnh mở đầu, ảnh slide kế tiếp và nhạc nền.
2. **Opening:** hiển thị song hỷ, tên cô dâu chú rể, ngày cưới và trái tim 3D.
3. **Curtain Reveal:** mở rèm, bung hạt sáng và hé lộ ảnh cưới đầu tiên.
4. **Hero:** giữ ảnh chính đủ lâu để tạo điểm nhấn.
5. **Story:** lần lượt trình chiếu các chương và slide theo cấu hình.
6. **Ending:** hiển thị lời cảm ơn, tên hai bạn và ngày cưới.
7. **Loop:** đặt lại trạng thái và bắt đầu vòng trình chiếu mới.

## Tiêu chí nghiệm thu

### Functional

- Website có thể tự khởi động trình chiếu sau lần tương tác đầu tiên.
- Nhạc phát đúng, tiếp tục qua các slide và lặp khi kết thúc.
- Slide chuyển đúng thứ tự và đúng thời lượng cấu hình.
- Toàn bộ câu chuyện tự động quay lại phần mở đầu.
- TV Mode hoạt động tại URL có `?tv=1`.
- Chế độ toàn màn hình được yêu cầu đúng lúc.
- Khi autoplay bị chặn, nút bật nhạc xuất hiện và hoạt động.
- Không có lỗi JavaScript làm dừng vòng trình chiếu.

### Performance

- Animation đạt gần 60 FPS trên thiết bị trình chiếu mục tiêu.
- Không có hiện tượng giật đáng chú ý khi đổi ảnh.
- Không drop frame kéo dài trong hiệu ứng mở rèm hoặc trái tim 3D.
- Bộ nhớ không tăng liên tục sau nhiều vòng lặp.
- Có thể chạy ổn định liên tục tối thiểu 30 phút.
- Hoạt động được khi mất kết nối Internet nếu tài nguyên đã được đóng gói cục bộ.

### UI

- Giao diện sử dụng đúng hệ màu đỏ–trắng.
- Font chữ, kích thước và khoảng cách đúng đặc tả.
- Ảnh không bị phủ màu bẩn hoặc sai màu da.
- Không có nền nâu, vàng nâu, tím hoặc xanh galaxy.
- Khuôn mặt cô dâu chú rể không bị che hoặc cắt sai.
- Caption đọc được từ khoảng cách 5–10 m.
- Bố cục đúng tỷ lệ 16:9 và nằm trong vùng an toàn TV.

### Quality checks

- `npm run build` hoàn thành không lỗi.
- `npm run lint` hoàn thành không lỗi.
- Không có lỗi nghiêm trọng trong console trình duyệt.
- Tất cả ảnh và tệp nhạc được tải thành công.
- Kiểm tra trực tiếp trên TV hoặc màn LED thật trước ngày tổ chức.

## Phạm vi dự án

### Bao gồm

- Website trình chiếu Wedding TV.
- TV Mode tối ưu cho màn hình 16:9.
- Album ảnh cưới theo từng chương.
- Nhạc nền.
- Mở rèm, trái tim 3D và các hiệu ứng chuyển cảnh.
- Caption, monogram và màn kết.
- Tự động chạy, toàn màn hình và tự động lặp.
- Cấu hình dữ liệu cục bộ.
- Tối ưu hiệu năng trên thiết bị trình chiếu mục tiêu.

### Không bao gồm

- Trang quản trị nội dung.
- Đăng ký hoặc đăng nhập.
- Database và API máy chủ.
- Upload ảnh trực tuyến.
- Đồng bộ dữ liệu đám mây.
- Hệ thống gửi lời chúc trực tuyến.
- Livestream buổi lễ.
- Ứng dụng di động riêng.

## Bảng màu chủ đạo

Chỉ sử dụng hệ màu **đỏ–trắng**.

| Vai trò | Màu gợi ý | Mã màu |
| --- | --- | --- |
| Đỏ chủ đạo | Đỏ ruby | `#A91D3B` |
| Đỏ sáng | Đỏ hoa hồng | `#C92B4B` |
| Đỏ trầm | Đỏ nhung | `#7D102D` |
| Nền chính | Trắng | `#FFFFFF` |
| Nền phụ | Trắng hồng | `#FFF5F6` |
| Ánh sáng | Trắng ngà | `#FFFDF8` |

Không sử dụng:

- Nâu hoặc vàng nâu.
- Xanh tím galaxy.
- Neon.
- Gradient nhiều màu.
- Lớp phủ làm sai màu da và váy cưới.

## Nguyên tắc hình ảnh

- Ảnh phải giữ màu gần nguyên bản.
- Mọi vùng trống quanh ảnh dọc phải có nền trắng sạch.
- Không phóng to ảnh nền rồi blur vì dễ trộn màu xanh lá và đỏ thành màu bùn.
- Khung ảnh chỉ dùng một đường đỏ mảnh.
- Không xếp quá nhiều đường viền hoặc bóng đổ.
- Bóng ảnh phải nhẹ, mềm và có sắc đỏ rất nhạt.
- Nội dung quan trọng cách mép TV tối thiểu 5–6%.

## Mở đầu

Trình tự mở màn:

1. Rèm nhung đỏ khép kín.
2. Biểu tượng song hỷ và tên hai bạn xuất hiện.
3. Trái tim 3D trắng–đỏ bao quanh phần tên.
4. Rèm mở sang hai bên trong khoảng 2,5 giây.
5. Trái tim bung thành hạt sáng.
6. Ánh sáng trắng lóe nhẹ ở khe rèm.
7. Ảnh cưới đầu tiên chuyển từ tối–mờ sang sáng rõ.
8. Camera zoom chậm và nối liền vào slide đầu tiên.

Trái tim 3D không được:

- Che mặt hoặc che tên.
- Chiếm toàn bộ màn hình.
- Dùng nhiều màu cầu vồng.
- Nhấp nháy hoặc đập quá nhanh.

## Hiệu ứng xuyên suốt

Các hiệu ứng được phép:

- Bokeh đỏ–trắng với mật độ thấp.
- Lụa trắng lướt nhẹ khi hé ảnh.
- Zoom và pan chậm như chuyển động máy quay.
- Crossfade mềm giữa hai cảnh.
- Ánh sáng trắng quét nhanh khi đổi cảnh.
- Caption xuất hiện bằng clip reveal nhẹ.
- Hoa hồng chỉ dùng ở phần mở đầu hoặc kết thúc.

Các hiệu ứng cần tránh:

- Xoay hoặc lật ảnh 3D.
- Flash mạnh.
- Camera rung.
- Hạt sáng dày đặc.
- Tim bay phủ toàn bộ màn hình.
- Hiệu ứng xuất hiện liên tục không có khoảng nghỉ.

## Caption

- Nền caption: đỏ ruby đặc.
- Chữ: trắng.
- Không dùng gradient trắng đục.
- Không dùng viền vàng.
- Tiêu đề nhỏ viết hoa; nội dung chính dùng serif nghiêng.
- Caption nằm trong vùng an toàn phía dưới màn hình.
- Mỗi caption nên ngắn, dễ đọc trong 2–3 giây.

## Nhận diện xuyên suốt

Monogram hiển thị ở góc trên:

```text
VT × XM
07 · 08 · 2026
```

Monogram dùng nền đỏ, chữ trắng và kích thước nhỏ. Không được cạnh tranh với ảnh chính.

## Cấu trúc câu chuyện

### Chương I — Duyên gặp gỡ

Giới thiệu khoảnh khắc hai người tìm thấy nhau.

### Chương II — Những năm tháng yêu thương

Những kỷ niệm, quá trình đồng hành và trưởng thành.

### Chương III — Ngày mình chung đôi

Ngày cưới, lời hẹn ước và hành trình về chung một nhà.

## Nhịp trình chiếu

- Mở đầu: khoảng 5 giây trước khi rèm bắt đầu mở.
- Mở rèm và hé ảnh: khoảng 2,5 giây.
- Mỗi slide: khoảng 10 giây.
- Màn kết: khoảng 15 giây.
- Toàn bộ vòng trình chiếu: khoảng 2 phút.

Nhịp chuyển cảnh cần bám theo nhạc, tránh đổi ảnh giữa một câu nhạc.

## Âm thanh

- Trình duyệt có thể chặn tự động phát nhạc.
- Khi nhạc chưa chạy, hiển thị nút **“Chạm để bật nhạc”**.
- Sau lần tương tác đầu tiên, trang yêu cầu toàn màn hình và bắt đầu phát nhạc.
- Không phát âm thanh hiệu ứng riêng ở mỗi chuyển cảnh.

## Hiệu năng

- Chỉ chạy animation của slide đang hoạt động.
- Giảm số lượng bokeh trên màn hình nhỏ.
- Trái tim WebGL phải được tải riêng bằng lazy loading.
- Có phương án hiển thị bình thường nếu WebGL không khả dụng.
- Không phụ thuộc kết nối Internet trong ngày tổ chức nếu có thể.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở chế độ TV:

```text
http://localhost:5173/Wedding/?tv=1
```

Kiểm tra trước khi sử dụng:

```bash
npm run build
npm run lint
```

## Checklist trước ngày cưới

- [ ] Kiểm tra trên TV hoặc màn LED thật.
- [ ] Kiểm tra vùng an toàn và hiện tượng overscan.
- [ ] Xác nhận ảnh không bị cắt mặt hoặc váy cưới.
- [ ] Xác nhận tất cả caption dễ đọc từ xa.
- [ ] Thử nút bật nhạc và chế độ toàn màn hình.
- [ ] Chạy thử liên tục ít nhất 30 phút.
- [ ] Kiểm tra lại khi không có Internet.
- [ ] Chuẩn bị một video MP4 dự phòng nếu trình duyệt gặp sự cố.
