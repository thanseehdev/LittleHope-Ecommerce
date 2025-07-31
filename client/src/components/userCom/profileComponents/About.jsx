import React from "react";

const AboutUs = () => {
  return (
    <div className=" border rounded-md p-4  max-w-4xl mx-auto mt-8 mb-10">
      <h2 className="lg:text-lg text-base font-semibold mb-3 border-b pb-2">More about Little Hope</h2>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 lg:text-base text-sm text-gray-700 space-y-4">
          <p>
            Launched in <span className="font-bold text-blue-600">2025</span>, Little Hope is a kidswear brand helping parents find the perfect mix of comfort, style, and affordability. We aim to make shopping delightful for families.
          </p>
          <p>
            Our return & care program is an <span className="text-blue-600 font-bold">intuitive solution</span> that allows customers to exchange or donate outgrown kidswear, promoting sustainability and happiness.
          </p>
          <p>Contact us : <span className="text-blue-600 font-semibold">littlehope.ecommerce@gmail.com</span></p>
        </div>
        <div className="flex-shrink-0">
          <img src='/LittleHope-Official-Logo2.png' alt="Little Hope Logo" className="w-28 h-28 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

