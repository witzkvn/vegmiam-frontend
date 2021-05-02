import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./ImageFullscreenSlider.scss";

const ImageFullscreenSlider = ({ imgUrl, handleCloseImageSlider }) => {
  if (!imgUrl) return handleCloseImageSlider();

  const handleClose = () => {
    console.log("close");
    handleCloseImageSlider();
  };

  return (
    <div className="ImageFullscreenSlider" onClick={handleClose}>
      <div className="ImageFullscreenSlider__wrapper">
        <img src={imgUrl} alt="recipe result example" onClick={(e) => e.stopPropagation()} />
      </div>
      <div className="ImageFullscreenSlider__close" onClick={handleClose}>
        <IoCloseCircle />
      </div>
    </div>
  );
};

export default ImageFullscreenSlider;
