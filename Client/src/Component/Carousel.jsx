import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

const Carousel = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length > 0) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [currentIndex, photos.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      {photos.length > 0 && photos[currentIndex] ? (
        <div className="carousel">
          <button className="prev-btn" onClick={prevImage}>&#10094;</button>
          <img
            src={`${BASE_URL}/uploads/${photos[currentIndex].photo}`}
            alt="carousel"
            className="carousel-image"
          />
          <button className="next-btn" onClick={nextImage}>&#10095;</button>
        </div>
      ) : (
        <h4 className="text-center">No Images Available</h4>
      )}
    </div>
  );
};

export default Carousel;
