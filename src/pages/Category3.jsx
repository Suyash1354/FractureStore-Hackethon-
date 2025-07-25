import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCard from './ProductCard';
import VariantCard from './VariantCard';
import CategoryNavbar from '../components/CategoryNavbar';
import LoadingScreen from '../components/LoadingScreen';
import useImagesLoader from '../hooks/useImagesLoader';

const Bikes = Array.from({ length: 6 }, (_, i) => `/assets/categories/Bikes/Bike${i + 1}.webp`);
const Previews = Array.from({ length: 6 }, (_, i) => `/assets/categories/BikesPrevieImage/BikesPrevieImage${i + 1}.webp`);

const Category2 = () => {
  const navigate = useNavigate();

  const allImages = [...Bikes, ...Previews];
  const { imagesLoaded } = useImagesLoader(allImages);

  const handleBuy = (product) => {
    navigate('/purchase', { state: product });
  };

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-2">
      <CategoryNavbar />

      <h1 className="lg:text-6xl text-center font-[Bezmiar-Regular] mb-10 leading-tight">
        <span className="block sm:hidden text-[16px]">
          SUPER ACTION <br />BIKE
        </span>
        <span className="hidden sm:inline">
          SUPER - ACTION - BIKE
        </span>
      </h1>

      <div className="w-full h-auto px-1 pb-1 pt-2 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5">
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">Elite Riders</h2>
          <ProductCard
            image={Bikes[0]}
            previewImage={Previews[0]}
            title="Cyber Blade ZX"
            description="Next-gen electric superbike with AI control and neon rims"
            btnText="Buy ₹30,000"
            onBuy={() =>
              handleBuy({
                image: Bikes[0],
                title: 'Cyber Blade ZX',
                price: '₹30,000',
              })
            }
          />
        </div>

        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">City Cruisers</h2>
          <VariantCard
            image={Bikes[1]}
            previewImage={Previews[1]}
            title="Storm Pulse R"
            description="High-performance cruiser for urban and highway rides"
            btnText="Buy ₹12,500"
            onBuy={() =>
              handleBuy({
                image: Bikes[1],
                title: 'Storm Pulse R',
                price: '₹12,500',
              })
            }
          />
          <VariantCard
            image={Bikes[2]}
            previewImage={Previews[2]}
            title="Night Claw 9000"
            description="Dark stealth bike with heat-resistant shielding and neon glow"
            btnText="Buy ₹22,000"
            onBuy={() =>
              handleBuy({
                image: Bikes[2],
                title: 'Night Claw 9000',
                price: '₹22,000',
              })
            }
          />
        </div>
      </div>

      <div className="w-full h-auto px-1 pb-1 pt-2 mt-10 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5 overflow-y-auto lg:overflow-hidden">
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">Neo Track Series</h2>
          <ProductCard
            image={Bikes[3]}
            previewImage={Previews[3]}
            title="Hover Fangs X"
            description="Hoverbike designed for high-speed racing with adaptive balance"
            btnText="Buy ₹27,500"
            onBuy={() =>
              handleBuy({
                image: Bikes[3],
                title: 'Hover Fangs X',
                price: '₹27,500',
              })
            }
          />
        </div>

        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">Velocity Class</h2>
          <VariantCard
            image={Bikes[4]}
            previewImage={Previews[4]}
            title="Shadow Streak V1"
            description="Lightweight speedster with carbon-fiber build and turbo boost"
            btnText="Buy ₹16,000"
            onBuy={() =>
              handleBuy({
                image: Bikes[4],
                title: 'Shadow Streak V1',
                price: '₹16,000',
              })
            }
          />
          <VariantCard
            image={Bikes[5]}
            previewImage={Previews[5]}
            title="Razor Volt 360"
            description="Electro-powered beast with AI-assisted stability control"
            btnText="Buy ₹21,000"
            onBuy={() =>
              handleBuy({
                image: Bikes[5],
                title: 'Razor Volt 360',
                price: '₹21,000',
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Category2;