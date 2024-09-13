import { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // change image every 2 seconds

      return () => clearInterval(interval); // cleanup interval on unmount
    }
  }, [images]);

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt="Product"
        className="h-40 w-full object-contain rounded-t-lg mb-4"
      />
    </div>
  );
};

export default Carousel;
