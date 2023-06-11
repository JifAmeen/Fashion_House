import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function FeaturesSection() {
  const isSmallScreen = window.innerWidth <= 995;

  if (isSmallScreen) {
    return (
      <Carousel fade>
        <Carousel.Item>
          <div className="feature-box">
            <i className="fas fa-truck fa-4x icon"></i>
            <h3>Free Shipping</h3>
            <p>
              Enjoy the convenience of free shipping on all orders, no minimum
              purchase required.
            </p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature-box">
            <i className="fas fa-phone fa-4x icon"></i>
            <h3>Customer Support</h3>
            <p>
              24/7 customer support to assist you with any inquiries or
              concerns.
            </p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature-box">
            <i className="fas fa-percent fa-4x icon"></i>
            <h3>Special Discounts</h3>
            <p>
              Unlock exclusive discounts and savings on your favorite clothing
              items with our special promotions.
            </p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature-box">
            <i className="fad fa-credit-card fa-4x icon"></i>
            <h3>Secure Payments</h3>
            <p>
              Shop with confidence knowing that your payments are secure and
              protected with advanced encryption.
            </p>
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }

  return (
    <div className="row">
      <div className="feature-box col-lg-3">
        <i className="fas fa-truck fa-4x icon"></i>
        <h3>Free Shipping</h3>
        <p>
          Enjoy the convenience of free shipping on all orders, no minimum
          purchase required.
        </p>
      </div>

      <div className="feature-box col-lg-3">
        <i className="fas fa-phone fa-4x icon"></i>
        <h3>Customer Support</h3>
        <p>
          24/7 customer support to assist you with any inquiries or concerns.
        </p>
      </div>

      <div className="feature-box col-lg-3">
        <i className="fas fa-percent fa-4x icon"></i>
        <h3>Special Discounts</h3>
        <p>
          Unlock exclusive discounts and savings on your favorite clothing items
          with our special promotions.
        </p>
      </div>

      <div className="feature-box col-lg-3">
        <i className="fad fa-credit-card fa-4x icon"></i>
        <h3>Secure Payments</h3>
        <p>
          Shop with confidence knowing that your payments are secure and
          protected with advanced encryption.
        </p>
      </div>
    </div>
  );
}
