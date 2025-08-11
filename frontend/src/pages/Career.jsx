import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const jobOpenings = [
  {
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote / Delhi Office",
    description: "Build engaging, user-friendly interfaces using React. Collaborate with designers and backend teams.",
    applyEmail: "hr@trendora.com",
  },
  {
    title: "Fashion Content Writer",
    type: "Part Time",
    location: "Remote",
    description: "Write fashion-focused blogs, product descriptions, and social media content aligned with our brand.",
    applyEmail: "hr@trendora.com",
  },
  {
    title: "Customer Support Executive",
    type: "Full Time",
    location: "Work from Home",
    description: "Assist customers with orders, complaints, and inquiries with professionalism and empathy.",
    applyEmail: "hr@trendora.com",
  },
];

const Career = () => {
  return (
    <main className="pt-10 px-4 sm:px-10 border-t">
      <div className="text-2xl text-center mb-6">
        <Title text1="JOIN" text2="OUR TEAM" />
      </div>

      <section className="text-center max-w-3xl mx-auto text-gray-700 mb-14">
        <p className="text-lg">
          At <b>Trendora</b>, we blend creativity, fashion, and technology to shape the future of e-commerce. We're looking for passionate individuals ready to make an impact.
        </p>
        <p className="mt-4">
          Explore the roles below and become part of a dynamic and inclusive culture.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 mb-20">
        {jobOpenings.map((job, i) => (
          <div
            key={i}
            className="border border-gray-300 p-6 rounded shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              📍 {job.location} | 🕒 {job.type}
            </p>
            <p className="text-sm text-gray-600 mb-4">{job.description}</p>
            <a
              href={`mailto:${job.applyEmail}?subject=Job Application - ${job.title}`}
              className="inline-block bg-black text-white px-5 py-2 rounded text-sm hover:bg-gray-800 transition"
            >
              Apply Now
            </a>
          </div>
        ))}
      </section>

      <NewsletterBox />
    </main>
  );
};

export default Career;
