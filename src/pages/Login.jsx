import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../components/StarsBackground";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import FloatingObject from "../components/FloatingObject";
const Spaceship = "/assets/Login/Spaceship.webp";

gsap.registerPlugin(TextPlugin);

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deniedMessage, setDeniedMessage] = useState("");
  const navigate = useNavigate();
  

  const containerRef = useRef();
  const headingRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();
  const switchTextRef = useRef();
  const spaceshipRef = useRef();
  const successRef = useRef();
  const deniedRef = useRef();

  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    // Reset success message
    setSuccessMessage("");
    setDeniedMessage("");

    gsap.set([emailRef.current, passRef.current, nameRef.current, btnRef.current, switchTextRef.current], {
      y: 40,
      opacity: 0
    });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1 })
      .to(headingRef.current, {
        text: isLogin ? "Welcome Back" : "Join Space Tour",
        duration: 1.5,
      })
      .to(
        [emailRef.current, passRef.current, nameRef.current, btnRef.current, switchTextRef.current],
        { y: 0, opacity: 1, stagger: 0.2 },
        "<0.2"
      );
  }, [isLogin]);

  // Spaceship animation
  useEffect(() => {
    const animateSpaceship = () => {
      const spaceship = spaceshipRef.current;
      if (!spaceship) return;

      const startY = Math.random() * 200 + 150;
      const endY = startY + (Math.random() * 100 - 50);
      
      gsap.set(spaceship, {
        x: -200,
        y: startY,
        rotation: Math.random() * 20 - 10,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(animateSpaceship, Math.random() * 8000 + 5000);
        }
      });

      tl.to(spaceship, {
        opacity: 1,
        duration: 0.5,
      })
      .to(spaceship, {
        x: window.innerWidth + 200,
        y: endY,
        rotation: `+=${Math.random() * 30 - 15}`,
        duration: Math.random() * 3 + 4,
        ease: "none",
      }, "<0.2")
      .to(spaceship, {
        opacity: 0,
        duration: 0.5,
      }, "-=0.5");
    };

    const initialDelay = setTimeout(animateSpaceship, 2000);
    return () => clearTimeout(initialDelay);
  }, []);

  const handleSwitchMode = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => setIsLogin((prev) => !prev),
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email")?.trim();
  const password = formData.get("password")?.trim();
  const name = formData.get("name")?.trim();

  if (!email || !password || (!isLogin && !name)) {
    setDeniedMessage("Access Denied - fill all the details");
    gsap.fromTo(deniedRef.current, { opacity: 0, y: -20 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      onComplete: () => {
        gsap.to(deniedRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          delay: 3,
        });
      }
    });
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  if (isLogin) {
    // LOGIN: Check if email/password match
    const existingUser = allUsers.find(user => user.email === email && user.password === password);
    
    if (!existingUser) {
      setDeniedMessage("Access Denied - Invalid credentials");
      gsap.fromTo(deniedRef.current, { opacity: 0, y: -20 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: () => {
          gsap.to(deniedRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            delay: 3,
          });
        }
      });
      return;
    }

    // Store current logged in user
    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    setSuccessMessage("You are entering the ship...");
    gsap.fromTo(successRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });

    setTimeout(() => {
      navigate("/");
    }, 2500);

  } else {
    // REGISTER: Check if user already exists
    const alreadyExists = allUsers.some(user => user.email === email);
    if (alreadyExists) {
      setDeniedMessage("User already exists. Please log in.");
      gsap.fromTo(deniedRef.current, { opacity: 0, y: -20 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: () => {
          gsap.to(deniedRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            delay: 3,
          });
        }
      });
      return;
    }

    const newUser = { email, password, name };
    const updatedUsers = [...allUsers, newUser];
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setSuccessMessage("You successfully joined the Space Tour!");
    gsap.fromTo(successRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });

    setTimeout(() => {
      navigate("/");
    }, 2500);
  }
};


  return (
    <div className="w-full h-screen bg-black text-white font-['Audiowide-Regular','Courier_New',monospace] flex items-center justify-center relative overflow-hidden">
      <StarsBackground />
      <FloatingObject src={Spaceship} alt="Spaceship" delay={1.5} size="w-[150px] md:w-[200px]" />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30"
      >
        <Navbar />
      </motion.div>

      <div ref={containerRef} className="z-10 w-[400px] p-8">
        <h1
          ref={headingRef}
          className="text-2xl text-center mb-6 whitespace-pre-wrap font-['Audiowide-Regular','Courier_New',monospace]"
        ></h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-['Audiowide-Regular','Courier_New',monospace]">
          {!isLogin && (
            <input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Name"
              className="bg-transparent border-b border-white placeholder-white focus:outline-none font-['Audiowide-Regular','Courier_New',monospace]"
            />
          )}
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent border-b border-white placeholder-white focus:outline-none font-['Audiowide-Regular','Courier_New',monospace]"
          />
          <input
            ref={passRef}
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent border-b border-white placeholder-white focus:outline-none font-['Audiowide-Regular','Courier_New',monospace]"
          />
          <button
            ref={btnRef}
            type="submit"
            className="bg-white text-black py-2 rounded hover:bg-gray-300 transition-all font-['Audiowide-Regular','Courier_New',monospace]"
          >
            {isLogin ? "Enter Ship" : "Launch Now"}
          </button>
        </form>

        <p
          ref={switchTextRef}
          onClick={handleSwitchMode}
          className="mt-4 text-center cursor-pointer text-sm text-gray-300 hover:text-white transition-all font-['Audiowide-Regular','Courier_New',monospace]"
        >
          {isLogin ? "New explorer? Join Space Tour" : "Already a Space Tourist? Enter Ship"}
        </p>

        {deniedMessage && (
          <div
            ref={deniedRef}
            className="text-center text-red-500 text-sm mt-4 whitespace-pre-wrap font-[Excon-Regular]"
          >
            {deniedMessage}
          </div>
        )}

        {successMessage && (
          <div
            ref={successRef}
            className="text-center text-green-700 text-sm mt-12 whitespace-pre-wrap font-[Excon-Regular]"
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;