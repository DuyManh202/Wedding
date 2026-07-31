import React from 'react';
import './RSVP.css';

const RSVP: React.FC = () => {
  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-container">
        <h2 className="section-title">Tham Dự Cùng Chúng Mình</h2>
        <p className="section-subtitle">Vui lòng xác nhận sự hiện diện của bạn</p>
        
        <form className="rsvp-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Tên của bạn *</label>
            <input type="text" id="name" placeholder="Nhập tên của bạn" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="attendance">Bạn sẽ tham dự chứ? *</label>
            <select id="attendance" required>
              <option value="" disabled selected>Chọn...</option>
              <option value="yes">Chắc chắn rồi!</option>
              <option value="no">Rất tiếc, mình không thể đến</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="guests">Số người tham dự cùng</label>
            <select id="guests">
              <option value="0">Đi một mình</option>
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Lời chúc</label>
            <textarea id="message" rows={4} placeholder="Gửi lời chúc tốt đẹp nhất đến cô dâu chú rể..."></textarea>
          </div>
          
          <button type="submit" className="btn rsvp-submit">Xác Nhận Tham Dự</button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;
