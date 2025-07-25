import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <span className="text-white text-xl sm:text-2xl md:text-4xl font-[Dena] tracking-wider animate-pulse">
        Teleporting...
      </span>
    </div>
  );
};

export default LoadingScreen;
