import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import StarsBackground from "../components/StarsBackground";
import LoadingScreen from "../components/LoadingScreen";
import useImagesLoader from "../hooks/useImagesLoader";

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const frontGateRef = useRef(null);
  const topGateRef = useRef(null);
  const bottomGateRef = useRef(null);
  const containerRef = useRef(null);


  const cat1WrapperRef = useRef(null);
  const cat2WrapperRef = useRef(null);
  const cat3WrapperRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [showLoading, setShowLoading] = useState(false);
  const [isGsapReady, setIsGsapReady] = useState(false);

  const productImages = [
    "/assets/gate_layers/Frontgate.webp",
    "/assets/gate_layers/Topgate1.webp",
    "/assets/gate_layers/Bottomgate1.webp",
    "/assets/categories/catpreview/Cat1.webp",
    "/assets/categories/catpreview/Cat2.webp",
    "/assets/categories/catpreview/Cat3.webp",
  ];

  const { imagesLoaded } = useImagesLoader(productImages);

  useEffect(() => {
    if (location.state?.fromCategory) {
      setShowLoading(true);
      setIsGsapReady(false);
    } else {
      setShowLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    if (showLoading && imagesLoaded && isGsapReady) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showLoading, imagesLoaded, isGsapReady]);


  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const topGate = topGateRef.current;
    const bottomGate = bottomGateRef.current;
    const container = containerRef.current;

    if (!topGate || !bottomGate || !container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=800vh",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1,
      },
    });

    tl.to(topGate, {
      y: "-50%",
      ease: "none",
    }).to(
      bottomGate,
      {
        y: "50%",
        ease: "none",
      },
      "<"
    );

    setIsGsapReady(true);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  useEffect(() => {
    const refs = [cat1WrapperRef.current, cat2WrapperRef.current, cat3WrapperRef.current];

    gsap.to(refs, {
      y: -12,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.4,
    });
  }, []);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="relative bg-black h-screen overflow-hidden">
        <StarsBackground />

        <img
          ref={frontGateRef}
          src="/assets/gate_layers/Frontgate.webp"
          alt="Front Gate"
          className="fixed top-0 left-0 w-full h-full object-cover z-30 pointer-events-none"
        />

        <img
          ref={topGateRef}
          src="/assets/gate_layers/Topgate1.webp"
          alt="Top Gate"
          className="absolute top-1/2 left-0 w-full h-full object-cover z-20 pointer-events-none"
          style={{ transform: "translateY(-50%)" }}
        />

        <img
          ref={bottomGateRef}
          src="/assets/gate_layers/Bottomgate1.webp"
          alt="Bottom Gate"
          className="absolute top-1/2 left-0 w-full h-full object-cover z-20 pointer-events-none"
          style={{ transform: "translateY(-50%)" }}
        />

        <div className="absolute inset-0 flex justify-center items-center z-10 gap-4">
          {/* Category 1 */}
          <div
            ref={cat1WrapperRef}
            className="flex flex-col items-center cursor-pointer relative left-10"
            onClick={() => navigate(`/category1`, { state: { fromProduct: true } })}
          >
            <img
              src="/assets/categories/catpreview/Cat1.webp"
              alt="Cars"
              className="w-[30vw] object-contain"
            />
            <p className="text-white mt-2 text-[10px] lg:text-[18px] font-[Dena] text-center">
              Sup Cars
            </p>
          </div>

          {/* Category 2 */}
          <div
            ref={cat2WrapperRef}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(`/category2`, { state: { fromProduct: true } })}
          >
            <img
              src="/assets/categories/catpreview/Cat2.webp"
              alt="Humanoid"
              className="w-[35vw] object-contain"
            />
            <p className="text-white mt-2 text-[10px] lg:text-[18px] font-[Dena] text-center">
              Humanoid
            </p>
          </div>

          {/* Category 3 */}
          <div
            ref={cat3WrapperRef}
            className="flex flex-col items-center cursor-pointer relative right-10"
            onClick={() => navigate(`/category3`, { state: { fromProduct: true } })}
          >
            <img
              src="/assets/categories/catpreview/Cat3.webp"
              alt="Bikes"
              className="w-[30vw] object-contain"
            />
            <p className="text-white mt-2 text-[10px] lg:text-[18px] font-[Dena] text-center">
              Sup Bikes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
