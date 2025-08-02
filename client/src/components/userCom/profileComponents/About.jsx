import React from "react";

const AboutUs = () => {
  return (
    <div className="border border-gray-200 rounded-md p-4 max-w-4xl mx-auto mt-8 mb-10">
      <h2 className="lg:text-lg text-base font-semibold mb-3 border-b border-gray-300 pb-2">
        More about Little Hope
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 lg:text-base text-sm text-gray-700 space-y-4">
          <p>
            <span className="font-bold text-blue-600">LittleHope</span> is a kids’ clothing store started in 2025. We bring you stylish, comfy, and high-quality clothes imported from trusted brands around the world.
          </p>
          <p>
            We carefully select each item to meet top quality standards, so your child can look great and feel happy in what they wear.
          </p>
          <p>
            At LittleHope, we focus on good materials, special designs, and classic styles that are perfect for every important moment in your child’s life.
          </p>
          <p>
            Contact us:{" "}
            <span className="text-blue-600 font-semibold">
              littlehope.ecommerce@gmail.com
            </span>
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src="/LittleHope-Official-Logo2.png"
            alt="Little Hope Logo"
            className="w-28 h-28 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;



