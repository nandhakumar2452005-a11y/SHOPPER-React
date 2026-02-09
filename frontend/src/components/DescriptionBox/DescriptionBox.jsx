import React from 'react'
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviws(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website plays a vital role in modern digital business by
          providing a seamless platform for online shopping and selling. It
          enables customers to browse a wide range of products, view detailed
          descriptions, images, and prices, and make informed purchasing
          decisions from the comfort of their homes. 
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          such as sizes, colors, or models.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox