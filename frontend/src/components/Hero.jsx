import React, { useState, useEffect } from "react";
import { assets } from "../assets/products";
import { useNavigate } from "react-router-dom";

const slides = [
  { image: assets.hero_img1 },
  { image: assets.hero_img2 },
  { image: assets.hero_img3 },
  { image: assets.hero_img4 },
  { image: assets.hero_img5 },
  { image: assets.hero_img6 },
  { image: assets.hero_img7 },
  { image: assets.hero_img8 },
  
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[70vh] sm:h-[85vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
              <button
                onClick={() => navigate("/collection")}
                className="px-8 py-3 bg-white text-black font-semibold text-sm rounded shadow-md hover:bg-gray-200 transition-all duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>

        {/* Arrows */}
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl z-20"
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
          }
        >
          ❮
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl z-20"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default Hero;
