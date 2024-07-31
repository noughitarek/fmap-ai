// ImageZoom.tsx
import React, { useState } from 'react';
import './ImageZoom.css'; // Import the CSS for styling

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <div
      className={`image-zoom-container ${zoom ? 'zoom' : ''}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
    >
      <img src={src} alt={alt} className="image-zoom" />
    </div>
  );
};

export default ImageZoom;
