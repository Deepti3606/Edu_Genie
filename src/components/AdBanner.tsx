import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const AdBanner: React.FC = () => {
  const [showAd, setShowAd] = useState(false);
  const [adContent, setAdContent] = useState({
    title: 'Boost Your Learning!',
    description: 'Discover amazing educational resources and tools to enhance your studies.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '#'
  });

  useEffect(() => {
    // Show ad every hour (3600000 ms)
    const adInterval = setInterval(() => {
      setShowAd(true);
    }, 3600000);

    // Show first ad after 5 minutes for demo
    const firstAdTimeout = setTimeout(() => {
      setShowAd(true);
    }, 300000);

    return () => {
      clearInterval(adInterval);
      clearTimeout(firstAdTimeout);
    };
  }, []);

  if (!showAd) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={() => setShowAd(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <img
            src={adContent.image}
            alt="Advertisement"
            className="w-full h-48 object-cover rounded-xl mb-6"
          />
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{adContent.title}</h3>
          <p className="text-gray-600 mb-6">{adContent.description}</p>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowAd(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={() => {
                window.open(adContent.link, '_blank');
                setShowAd(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Learn More
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Ads help keep EduGenie free for everyone
          </p>
        </div>
      </div>
    </div>
  );
};