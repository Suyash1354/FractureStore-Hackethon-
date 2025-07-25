import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import StarsBackground from "../components/StarsBackground";

const About = () => {
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const para3Ref = useRef(null);
  const para4Ref = useRef(null);
  const mobileRefs = useRef([]);

  useEffect(() => {
    // Animate Desktop Paragraphs (corner animations)
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out", opacity: 0 },
    });

    if (window.innerWidth >= 768) {
      tl.fromTo(
        para1Ref.current,
        { x: "-100%", y: "-100%" },
        { x: "0%", y: "0%", opacity: 1 }
      )
        .fromTo(
          para2Ref.current,
          { x: "100%", y: "-100%" },
          { x: "0%", y: "0%", opacity: 1 },
          "-=1"
        )
        .fromTo(
          para3Ref.current,
          { x: "-100%", y: "100%" },
          { x: "0%", y: "0%", opacity: 1 },
          "-=1"
        )
        .fromTo(
          para4Ref.current,
          { x: "100%", y: "100%" },
          { x: "0%", y: "0%", opacity: 1 },
          "-=1"
        );
    } else {
      // Animate Mobile Paragraphs (fade-in stacked)
      mobileRefs.current.forEach((ref, i) => {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.3,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <StarsBackground />

      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30"
      >
        <Navbar />
      </motion.div>

      {/* Centered Title for Desktop Only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"
      >
        <h1 className="flicker whitespace-nowrap text-[20px] md:text-[44px] lg:text-[70px] font-[quantum] tracking-wide">
          FRACTURE-STORE
        </h1>
      </motion.div>

      {/* 💻 Desktop Layout (absolute corner paragraphs) */}
      <div className="hidden md:block">
        <div
          ref={para1Ref}
          className="absolute top-24 left-8 max-w-md text-xl opacity-0"
        >
          <h2 className="text-[1.2vw] font-[orbitron-bold] mb-2">
            About the Company
          </h2>
          <p className="text-[.8vw] font-[Excon-Regular]">
            FRACTURE.STORE was not born it was decoded. Designed in the dark
            corners of digital rebellion, we exist to craft artifacts from a
            future that never happened. Each action figure we create is forged
            with lore, built for storytelling, and engineered for those who dont
            just collect they believe.
          </p>
        </div>

        <div
          ref={para2Ref}
          className="absolute top-24 right-8 max-w-md text-xl opacity-0"
        >
          <h2 className="text-[1.2vw]  font-[orbitron-bold] mb-2">
            The Idea Behind the Brand
          </h2>
          <p className="text-[.8vw] font-[Excon-Regular]">
            We started with a question What if the multiverse had merch? So we
            built FRACTURE.STORE not just a shop, but a portal. Every product is
            a key to a parallel timeline, hand-sculpted for sci-fi addicts,
            anime lovers, and dystopian dreamers. This isnt ecommerce. This is
            artifact extraction.
          </p>
        </div>

        <div
          ref={para3Ref}
          className="absolute bottom-16 left-8 max-w-md text-xl opacity-0"
        >
          <h2 className="text-[1.2vw]  font-[orbitron-bold] mb-2">
            The Future Vision
          </h2>
          <p className="text-[.8vw] font-[Excon-Regular]">
            The fracture is only widening. In the next phase, we plan to launch
            limited-run drops, web-based storytelling arcs, and mixed-reality
            experiences that blend our figures into digital worlds. Expect
            gamified lore, exclusive figure quests, and NFTs as soul-bound gear.
            The future isnt coming we’re building it.
          </p>
        </div>

        <div
          ref={para4Ref}
          className="absolute bottom-16 right-8 max-w-md text-xl opacity-0"
        >
          <h2 className="text-[1.2vw]  font-[orbitron-bold] mb-2">More</h2>
          <p className="text-[.8vw] font-[Excon-Regular]">
            We arent here to please the mainstream. Were here to corrupt it with
            creativity, with chaos, with collectibles that bite back.
            FRACTURE.STORE is a call to arms for creators who live in the
            margins, dream in neon, and wear their weird like a war badge. Youre
            not shopping. Youre joining a movement.
          </p>
        </div>
      </div>

      {/* 📱 Mobile Layout (stacked) */}
      <div className="md:hidden pt-32 px-4 flex flex-col gap-12">
        {[
          {
            title: "About the Company",
            text: `FRACTURE.STORE was not born it was decoded. Designed in the dark
      corners of digital rebellion, we exist to craft artifacts from a
      future that never happened. Each action figure we create is forged
      with lore, built for storytelling, and engineered for those who
      dont just collect they believe.`,
          },
          {
            title: "The Idea Behind the Brand",
            text: `We started with a question What if the multiverse had merch? So
      we built FRACTURE.STORE not just a shop, but a portal. Every
      product is a key to a parallel timeline, hand-sculpted for sci-fi
      addicts, anime lovers, and dystopian dreamers. This isnt ecommerce.
      This is artifact extraction.`,
          },
          {
            title: "The Future Vision",
            text: `The fracture is only widening. In the next phase, we plan to launch
      limited-run drops, web-based storytelling arcs, and mixed-reality
      experiences that blend our figures into digital worlds. Expect
      gamified lore, exclusive figure quests, and NFTs as soul-bound gear.
      The future isnt coming were building it.`,
          },
          {
            title: "Extra Paragraph",
            text: `We arent here to please the mainstream. Were here to corrupt it 
      with creativity, with chaos, with collectibles that bite back.
      FRACTURE.STORE is a call to arms for creators who live in the
      margins, dream in neon, and wear their weird like a war badge.
      Youre not shopping. Youre joining a movement.`,
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (mobileRefs.current[i] = el)}
            className="text-center text-base sm:text-lg"
          >
            <h2 className="text-xl  font-[orbitron-bold] mb-2">{item.title}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
