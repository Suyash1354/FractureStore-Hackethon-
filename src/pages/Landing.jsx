import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

import Navbar from "../components/Navbar";
import StarsBackground from "../components/StarsBackground";
import FloatingObject from "../components/FloatingObject";


const Astronaut = "/assets/floatingObj/astronaut.webp";
const Astroid1 = "/assets/floatingObj/Astroid1.webp";
const Astroid2 = "/assets/floatingObj/Astroid2.webp";
const introVideo = "/assets/intro2.webm";

const Landing = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isDragged, setIsDragged] = useState(false);
  const [videoFinished, setVideoFinished] = useState(() => {
    // Check if video was already played in this session
    return sessionStorage.getItem("introPlayed") === "true";
  });
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader if video hasn't been played in this session
    return sessionStorage.getItem("introPlayed") !== "true";
  });

  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setUserName(user.name);
      const ordersKey = `orders_${user.email}`;
      const storedOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
      setOrders(storedOrders);
    }
  }, []);

  useEffect(() => {
    // If video was already played in this session, don't show loader
    if (sessionStorage.getItem("introPlayed") === "true") {
      return;
    }

    const video = videoRef.current;

    const handleVideoEnd = () => {
      console.log("🎬 Video finished playing - showing main content");
      setVideoFinished(true);
      setIsLoading(false);
      // Mark video as played for this session
      sessionStorage.setItem("introPlayed", "true");
    };

    const handleLoadedData = () => {
      console.log("📹 Video loaded - starting playback");
      video.play().catch(console.error);
    };

    const handleVideoStart = () => {
      console.log("▶ Video started playing");
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("playing", handleVideoStart);
    }

    console.log("🔄 Loader initialized - waiting for video");

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("playing", handleVideoStart);
      }
    };
  }, []);

  useEffect(() => {
    const body = document.body;

    if (isLoading) {
      body.style.overflow = "hidden"; 
    } else {
      body.style.overflowY = "auto";  
      body.style.overflowX = "hidden"; 
    }

    return () => {
      body.style.overflowY = "auto";
      body.style.overflowX = "hidden";
    };
  }, [isLoading]);

  return (
    <div
  ref={containerRef}
  className="relative w-full h-screen bg-black text-white overflow-hidden laptop-fix-padding"
>

      <StarsBackground />

      {/* Intro Video Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
            >
              <source src={introVideo} type="video/webm" />
              <source src={introVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {videoFinished && (
        <>
          {/* Floating Objects */}
          <FloatingObject src={Astroid1} alt="Astroid 1" delay={1.2} />
          <FloatingObject src={Astroid2} alt="Astroid 2" delay={1.4} />

          {/* Floating Astronaut */}
          <div
            className="absolute z-30"
            style={{
              top: "calc(50% + 150px)",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            <motion.img
              src={Astronaut}
              alt="Astronaut"
              className="w-[150px] md:w-[200px] z-20"
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
              onDragStart={() => setIsDragged(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1, duration: 1 },
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  repeatType: "loop",
                },
              }}
            />

            {!isDragged && (
              <motion.div
                className="absolute top-1/2 left-full m-2 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ transform: "translateY(-50%)" }}
              >
                <div className="w-10 h-px bg-white mr-2"></div>
                <p className="text-sm md:text-[12px] font-[Excon-Regular] text-white whitespace-nowrap">
                  Drag me
                </p>
              </motion.div>
            )}
          </div>

          {/* Navbar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30"
          >
            <Navbar />
          </motion.div>

          {/* Center Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"
          >
            <h1 className="flicker whitespace-nowrap text-[20px] md:text-[44px] lg:text-[70px] font-[quantum] tracking-wide">
              FRACTURE-STORE
            </h1>
            <p className="text-sm md:text-lg font-[orbitron-bold] text-[#5c5c5c] mt-2">
              Cyberpunk Action Figures from a Fractured World
            </p>
          </motion.div>

          {/* Username & Orders Panel */}
          {userName && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute md:top-5 md:right-6 top-20 left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0 z-40 md:text-right text-center text-white font-[Audiowide-Regular] text-sm space-y-2 cursor-pointer select-none"
            >
              <p
                onClick={() => {
                  if (showOrders) {
                    setShowOrders(false);
                  } else {
                    setShowProfile((prev) => !prev);
                  }
                }}
                className="transition duration-300 opacity-80"
              >
                {userName}
              </p>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    key="orders-panel"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-1"
                  >
                    {/* Orders Toggle */}
                    <p
                      className="underline transition opacity-80"
                      onClick={() => setShowOrders((prev) => !prev)}
                    >
                      Orders
                    </p>

                    {/* Logout */}
                    <motion.p
                      className="underline transition cursor-pointer opacity-80"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.8 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      onClick={() => {
                        localStorage.removeItem("currentUser");
                        // Don't remove sessionStorage here - let it persist until browser/tab closes
                        window.location.reload();
                      }}
                    >
                      Logout
                    </motion.p>

                    {/* Orders List */}
                    <AnimatePresence>
                      {showOrders && (
                        <motion.ul
                          key="order-list"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="list-disc pl-5 space-y-0.5 text-[#ccc] max-w-[200px] break-words md:text-left text-center opacity-80"
                        >
                          {orders.length === 0 ? (
                            <li>No orders yet</li>
                          ) : (
                            orders.map((order, index) => (
                              <li key={index}>{order.title}</li>
                            ))
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Landing;