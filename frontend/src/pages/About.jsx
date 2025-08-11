import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/products';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <>
      {/* About Us Section */}
      <section className="pt-8 text-center border-t">
        <Title text1="ABOUT" text2="US" />
      </section>

      <section className="flex flex-col gap-10 my-10 md:flex-row md:items-center">
        <img
          className="w-full max-w-full md:max-w-[450px] rounded"
          src={assets.about_img}
          alt="About Trendora"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/3">
          <p>
            Welcome to <b>Trendora</b> — where fashion meets identity. We’re more than just an online store; we’re your go-to destination for curated, trend-forward fashion. At Trendora, we merge quality, comfort, and elegance to help you express your unique style every day.
          </p>
          <p>
            Our fashion experts carefully curate every collection to ensure you always have access to timeless pieces and the latest runway-inspired designs. Whether it’s for a party, office, or everyday vibe — Trendora has what you need to feel confident and look amazing.
          </p>

          <b className="text-gray-800 text-base">Our Mission</b>
          <p>
            To redefine everyday fashion with accessible, stylish, and quality wear. Trendora empowers every individual to dress authentically with affordable elegance.
          </p>

          <b className="text-gray-800 text-base">Our Vision</b>
          <p>
            We aim to be the most trusted fashion brand globally — driven by creativity, sustainability, and an unwavering passion for empowering style.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center mb-6">
        <Title text1="WHY" text2="CHOOSE US" />
      </section>

      <section className="flex flex-col gap-6 md:flex-row mb-20 text-sm">
        {[
          {
            title: 'Uncompromised Quality',
            content:
              'Each Trendora piece is crafted with precision and tested for lasting durability. Because fashion should be stylish — and strong.',
          },
          {
            title: 'Seamless Experience',
            content:
              'Enjoy a smooth shopping experience — from browsing to doorstep delivery — with fast, secure payments and real-time tracking.',
          },
          {
            title: 'Dedicated Support',
            content:
              'Have a question? Our customer service team is here for you — from style help to delivery questions, we’ve got your back.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 px-6 py-8 border rounded md:px-8 sm:py-12 flex-1"
          >
            <b className="text-base text-gray-800">{item.title}</b>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </section>

      {/* Newsletter Box */}
      <NewsletterBox />
    </>
  );
};

export default About;
