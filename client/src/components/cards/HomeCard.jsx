import React from 'react';

const cards = [
  {
    title: "Rainy Day Essentials",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB.webp",
  },
  {
    title: "Everyday Made Adorable",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB2.webp",
  },
  {
    title: "Tiny Twirls Strap Dress",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB3.webp",
  },
  {
    title: "Tiny Twirls Strap Dress",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB4.png",
  },
  {
    title: "Tiny Twirls Strap Dress",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB5.webp",
  },
  {
    title: "Tiny Twirls Strap Dress",
    subtitle: "Flat 40% Off",
    buttonText: "Shop now",
    image: "/premiumImg/premiumB6.webp",
  },
];

export default function CardSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <h2 className="text-center text-2xl lg:text-3xl font-bold text-gray-800 mb-8">Premium Boutiques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <img src={card.image} alt={card.title} className="w-full h-64  transition-transform duration-300 ease-in-out group-hover:scale-110" />
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.subtitle}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

