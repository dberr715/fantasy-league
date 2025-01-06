"use client";

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-blue-500 flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/your-logo-image.jpg")' }}
        ></div>
        <div className="relative z-10 px-6 py-12">
          <p className="text-xl mb-6">
            League members, participate in the poll below!
          </p>
        </div>
      </section>

      {/* Poll Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Choose what future months likely will work for you for a MLK style
            get together?
          </h2>

          {/* Embed Google Form */}
          <div className="w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeB-OPAOhPvSPwT5uLSpsH8mT0-cjSy7-1YD9u79njaAsJonw/viewform?embedded=true"
              width="640"
              height="1018"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
