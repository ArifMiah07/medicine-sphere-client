'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PromoSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeRemaining() {
    const offerEnd = new Date();
    offerEnd.setHours(23, 59, 59, 999); // offer ends tonight
    const total = offerEnd.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return { total, hours, minutes, seconds };
  }

  return (
    <section className="w-full py-12 text-center  shadow-lg">
      <h2 className="text-4xl font-bold italic mb-3 animate-pulse">🚴‍♂️ Special Offer!</h2>
      <p className="text-xl font-semibold">Get 15% off on all Electric Bikes this weekend only!</p>
      <div className="mt-6 flex justify-center gap-6 text-2xl font-mono">
        <div className="bg-white text-green-600 rounded-md px-4 py-2 shadow-md">
          {String(timeLeft.hours).padStart(2, '0')}<span className="block text-sm">Hours</span>
        </div>
        <div className="bg-white text-green-600 rounded-md px-4 py-2 shadow-md">
          {String(timeLeft.minutes).padStart(2, '0')}<span className="block text-sm">Minutes</span>
        </div>
        <div className="bg-white text-green-600 rounded-md px-4 py-2 shadow-md">
          {String(timeLeft.seconds).padStart(2, '0')}<span className="block text-sm">Seconds</span>
        </div>
      </div>
      
      {/* Call to Action Link */}
      <div className="mt-8">
        <Link href="/shop" className="inline-block bg-yellow-500 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default PromoSection;
