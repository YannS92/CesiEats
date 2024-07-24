import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "./elements/Button";
import BK from "../assets/images/BK.png";
import MD from "../assets/images/MD.jpg";
import PlanetSushi from "../assets/images/Planet-Sushi.png";
import ImageWithErrorHandling from './ImageWithErrorHandling';

const carouselImages = [
  { src: BK, alt: "Image de Burger King" },
  { src: MD, alt: "Image de McDonald's" },
  { src: PlanetSushi, alt: "Image de Planet Sushi" },
];

export const Banner = () => {
  return (
    <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex flex-col md:flex-row items-center justify-between">
      <div className="banner-deescription w-full md:w-1/2 p-3">
        <h2 className="mb-6 text-4xl font-bold text-white">
          CESI EATS
        </h2>
        <p className="font-semibold text-lg text-red-600 py-2">
          Get Started Today!
        </p>
        <div className="btn-container">
          <Button>Order Now</Button>
          <Link to="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
            See Menu
          </Link>
        </div>
      </div>
      <div className="banner-image w-full md:w-1/2 p-3 flex justify-end">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} dynamicHeight className="w-3/4">
          {carouselImages.map((image, index) => (
            <div key={index}>
              <ImageWithErrorHandling src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
