import React from 'react';
import './EventDetails.css';

const EventDetails: React.FC = () => {
  return (
    <section className="events-section" id="events">
      <h2 className="section-title">Sự Kiện</h2>
      <p className="section-subtitle">Thông tin chi tiết về lễ cưới</p>

      <div className="events-container">
        <div className="event-card">
          <div className="event-icon">💒</div>
          <h3 className="event-title cursive">Lễ Vu Quy</h3>
          <p className="event-time">09:00 SA | Thứ Sáu, 07.08.2026</p>
          <p className="event-location">Tư gia nhà gái</p>
          <p className="event-address">Số 123, Đường ABC, Quận Cầu Giấy, Hà Nội</p>
          <a href="#" className="btn event-btn">Xem Bản Đồ</a>
        </div>

        <div className="event-card">
          <div className="event-icon">🥂</div>
          <h3 className="event-title cursive">Tiệc Cưới</h3>
          <p className="event-time">11:30 SA | Thứ Sáu, 07.08.2026</p>
          <p className="event-location">Trung tâm tiệc cưới Trống Đồng</p>
          <p className="event-address">Số 456, Đường XYZ, Quận Ba Đình, Hà Nội</p>
          <a href="#" className="btn event-btn">Xem Bản Đồ</a>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
