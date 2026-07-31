import React from 'react';
import './Album.css';

// Import all images from the src/img directory
import img1 from '../../img/2aOboQnzPKVZhEJePKDjg2jl1QNbJcIkXKHtrQ1o.jpg';
import img2 from '../../img/2aOboQnzPKVZhEJePKDjg2qJbVHkKOAGqkyQ4uEy.jpg';
import img3 from '../../img/2aOboQnzPL6gwV4GZl4SEuAyFyBCTuzYH8KDZw5g.jpg';
import img4 from '../../img/2aOboQnzPLLD0VSWoaT8ZcQJduUzHUSOnhcVUkJk.jpg';
import img5 from '../../img/2aOboQnzQtk5LBvsUuy0tRmCzkq5iCFDi4VaE1Ca.jpg';
import img6 from '../../img/2aOboQnzQtk5LBvsUuy0tRnDWDYP3VZQf2eOmqHI.jpg';
import img7 from '../../img/2aOboQnzQtmOrfUFCAXHhKZPEpnmrLBmLIS0MF3w.jpg';
import img8 from '../../img/2aOboQnzQtxtcPNJg0dG25eypBPOg6y9NBReGHOC.jpg';
import img9 from '../../img/2aOboQnzQuD7TCiOyZlNYsEhbEI83nj0cdTzUXAG.jpg';
import img10 from '../../img/2aOboQnzQvMDM0tJ2pXX9d4xMaDgJL1awuwIdd7A.jpg';
import img11 from '../../img/2aOboQnzQvYt5P1kctrEoVHCLtbTQVD1SpMKJEsC.jpg';
import img12 from '../../img/2aOboQnzQvmhMcTBnzWTx9KvRx11nYERSuTJn3aq.jpg';
import img13 from '../../img/2aOboQnzQy52rWaVxKZYW0t4rSMYsckxIemPOkhE.jpg';
import img14 from '../../img/2aOboQnzQyI23UFzZ3smva1lA1DT6OIHhQkCTw8G.jpg';
import img15 from '../../img/2aOboQnzQyYOS6u4SeMRw8QYi8OAYh1KCELkIJto.jpg';
import img16 from '../../img/2aOboQnzQyptOYr8xGBeQStZ0uiOsFjtyFfmqsfw.jpg';
import img17 from '../../img/2aOboQnzQzt3xIqo19yxYKImDBbthgyA2o7GrkQ4.jpg';
import img18 from '../../img/2aOboQnzR079GGstihlXbKeUOdLQ4y7rdigpgVMG.jpg';
import img19 from '../../img/2aOboQnzR1qoKqd6uU9jwEWeQDlP90CEnFZ6NBLs.jpg';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19
];

const Album: React.FC = () => {
  return (
    <section className="album-section" id="album">
      <div className="album-container">
        <h2 className="section-title">Album Ảnh Cưới</h2>
        <p className="section-subtitle">Khoảnh khắc hạnh phúc của chúng mình</p>
        
        <div className="masonry-grid">
          {images.map((src, index) => (
            <div className="masonry-item" key={index}>
              <img src={src} alt={`Wedding moment ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Album;
