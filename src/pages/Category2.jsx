import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCard from './ProductCard';
import VariantCard from './VariantCard';
import CategoryNavbar from '../components/CategoryNavbar';
import LoadingScreen from '../components/LoadingScreen';
import useImagesLoader from '../hooks/useImagesLoader';

const Humanoids = Array.from({ length: 6 }, (_, i) => `/assets/categories/Humanoid/Humanoid${i + 1}.webp`);
const Previews = Array.from({ length: 6 }, (_, i) => `/assets/categories/HumanoidPreviewImages/HumanoidPreviewImages${i + 1}.webp`);

const Category3 = () => {
  const navigate = useNavigate();

  const allImages = [...Humanoids, ...Previews];
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
          ACTION <br />HUMANOID
        </span>
        <span className="hidden sm:inline">
          ACTION - HUMANOID
        </span>
      </h1>

      <div className="w-full h-[calc(100vh-250px)] px-1 pb-1 pt-2 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5">
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">Cyber Elites</h2>
          <ProductCard
            image={Humanoids[0]}
            previewImage={Previews[0]}
            title="Xenon Unit V"
            description="Top-tier humanoid with neural combat interface and adaptive AI"
            btnText="Buy ₹45,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[0],
                title: 'Xenon Unit V',
                price: '₹45,000',
              })
            }
          />
        </div>

        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">Combat Core</h2>
          <VariantCard
            image={Humanoids[1]}
            previewImage={Previews[1]}
            title="Astra Sentinel"
            description="Armored humanoid with shield matrix and plasma burst mode"
            btnText="Buy ₹35,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[1],
                title: 'Astra Sentinel',
                price: '₹35,000',
              })
            }
          />
          <VariantCard
            image={Humanoids[2]}
            previewImage={Previews[2]}
            title="Delta Shockwave"
            description="High-speed striker unit with EMP fists and stealth cloak"
            btnText="Buy ₹38,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[2],
                title: 'Delta Shockwave',
                price: '₹38,000',
              })
            }
          />
        </div>
      </div>

      <div className="w-full h-[calc(100vh-250px)] px-1 pb-1 pt-2 mt-10 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5 overflow-y-auto lg:overflow-hidden">
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">Stealth Division</h2>
          <ProductCard
            image={Humanoids[3]}
            previewImage={Previews[3]}
            title="Nyx Operative"
            description="Infiltration-class humanoid with shadow-step and neural jammer"
            btnText="Buy ₹40,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[3],
                title: 'Nyx Operative',
                price: '₹40,000',
              })
            }
          />
        </div>

        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">Rogue Units</h2>
          <VariantCard
            image={Humanoids[4]}
            previewImage={Previews[4]}
            title="Glitch Berserker"
            description="Malfunctioned warrior unit with unpredictable power surges"
            btnText="Buy ₹28,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[4],
                title: 'Glitch Berserker',
                price: '₹28,000',
              })
            }
          />
          <VariantCard
            image={Humanoids[5]}
            previewImage={Previews[5]}
            title="Omega Trace AI"
            description="Hacked AI core humanoid with data-harvesting protocols"
            btnText="Buy ₹33,000"
            onBuy={() =>
              handleBuy({
                image: Humanoids[5],
                title: 'Omega Trace AI',
                price: '₹33,000',
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Category3;
