"use client";

import NavBar from "@/components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-black-100 text-gray-900">
        {/* Hero Section */}
        <section className="hero-section flex flex-col md:flex-row items-center justify-between px-8 py-16">
          <div className="text-section flex-1 text-white">
            {" "}
            {/* Ensure text is white */}
            <h2 className="text-3xl font-bold mb-4 text-white">
              Celebrating 10 Years of Play
            </h2>
            <p className="text-lg mb-4 text-white">
              Based in South Carolina, we’ve been bringing the community
              together through fantasy football for a decade.
            </p>
          </div>
          <div className="logo-section flex-1 flex justify-center">
            <img
              src="/images/cgl1.webp" // Your uploaded logo
              alt="League Logo"
              className="w-80 h-auto object-contain"
            />
          </div>
        </section>

        {/* Poll Section */}
        <section className="poll-section py-16 bg-gray-800 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">
              League members, participate in the poll below!
            </h2>

            {/* Embed Google Form */}
            <div className="w-full">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeB-OPAOhPvSPwT5uLSpsH8mT0-cjSy7-1YD9u79njaAsJonw/viewform?embedded=true"
                width="640"
                height="1018"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
