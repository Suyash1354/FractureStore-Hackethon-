import React from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import VariantCard from "./VariantCard";
import CategoryNavbar from "../components/CategoryNavbar";
import LoadingScreen from "../components/LoadingScreen";
import useImagesLoader from "../hooks/useImagesLoader";

// Category 1: Cars
const Cars = Array.from(
  { length: 6 },
  (_, i) => `/assets/categories/Cars/Car${i + 1}.webp`
);
const PreviewImages = Array.from(
  { length: 6 },
  (_, i) => `/assets/categories/CarsPreviewImages/Image${i + 1}.webp`
);

const Category1 = () => {
  const navigate = useNavigate();

  const allImages = [...Cars, ...PreviewImages];
  const { imagesLoaded } = useImagesLoader(allImages);

  const handleBuy = (product) => {
    navigate("/purchase", { state: product });
  };

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-2">
      {/* Navbar */}
      <CategoryNavbar />

      {/* Title */}
      <h1 className="lg:text-6xl text-center font-[Bezmiar-Regular] mb-10 leading-tight">
        <span className="block sm:hidden text-[16px]">
          SUPER ACTION <br />
          CAR
        </span>
        <span className="hidden sm:inline">SUPER - ACTION - CAR</span>
      </h1>

      {/* First Section */}
      <div className="w-full h-auto px-1 pb-1 pt-2 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5">
        {/* LEFT COLUMN - Elite Series */}
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">
            Suyash
          </h2>
          <ProductCard
            image={Cars[0]}
            previewImage={PreviewImages[0]}
            title="Cyber Phantom GT"
            description="Sleek cybernetic design with stealth mode and turbo boosters"
            btnText="Buy ₹22,000"
            onBuy={() =>
              handleBuy({
                image: Cars[0],
                title: "Cyber Phantom GT",
                price: "₹22,000",
              })
            }
          />
        </div>

        {/* RIGHT COLUMN - Urban Series */}
        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">
            Urban Series
          </h2>
          <VariantCard
            image={Cars[1]}
            previewImage={PreviewImages[1]}
            title="Drone Runner X1"
            description="Lightweight drone car with agile handling and compact build"
            btnText="Buy ₹7,500"
            onBuy={() =>
              handleBuy({
                image: Cars[1],
                title: "Drone Runner X1",
                price: "₹7,500",
              })
            }
          />
          <VariantCard
            image={Cars[2]}
            previewImage={PreviewImages[2]}
            title="Armored Titan Cruiser"
            description="Heavily armored battle car with reinforced plating and missile pods"
            btnText="Buy ₹20,000"
            onBuy={() =>
              handleBuy({
                image: Cars[2],
                title: "Armored Titan Cruiser",
                price: "₹20,000",
              })
            }
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full h-auto px-1 pb-1 pt-2 mt-10 bg-[#FAFBF7] text-black rounded-xl flex flex-col lg:flex-row gap-0.5 overflow-y-auto lg:overflow-hidden">
        {/* LEFT COLUMN - Urban Series */}
        <div className="w-full lg:flex-1 flex flex-col min-h-0 h-full">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-2">
            Urban Series
          </h2>
          <ProductCard
            image={Cars[3]}
            previewImage={PreviewImages[3]}
            title="Skyblade Hover Racer"
            description="Futuristic hover car with anti-gravity tech and neon underglow"
            btnText="Buy ₹18,500"
            onBuy={() =>
              handleBuy({
                image: Cars[3],
                title: "Skyblade Hover Racer",
                price: "₹18,500",
              })
            }
          />
        </div>

        {/* RIGHT COLUMN - Swift Class */}
        <div className="w-full lg:w-[40%] flex flex-col min-h-0 h-full gap-0.5">
          <h2 className="text-center text-xl font-[orbitron-bold] mb-1">
            Swift Class
          </h2>
          <VariantCard
            image={Cars[4]}
            previewImage={PreviewImages[4]}
            title="Street Hawk ZR"
            description="Urban cruiser with neon accents and responsive controls"
            btnText="Buy ₹9,000"
            onBuy={() =>
              handleBuy({
                image: Cars[4],
                title: "Street Hawk ZR",
                price: "₹9,000",
              })
            }
          />
          <VariantCard
            image={Cars[5]}
            previewImage={PreviewImages[5]}
            title="Neo Thunder X"
            description="Next-gen racing beast with lightning-speed acceleration"
            btnText="Buy ₹15,000"
            onBuy={() =>
              handleBuy({
                image: Cars[5],
                title: "Neo Thunder X",
                price: "₹15,000",
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Category1;
