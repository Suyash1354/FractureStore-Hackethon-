import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
const bgImage = "/assets/categories/Spaceship.webp";
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const PurchaseCard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { title, price, image } = state || {};

  const titleRef = useRef();
  const priceRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const btnRef = useRef();
  const imageRef = useRef();
  const deniedRef = useRef();
  const cardRef = useRef();
  const successTextRef = useRef();

  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  useEffect(() => {
    const bgImg = new Image();
    bgImg.onload = () => setBgImageLoaded(true);
    bgImg.onerror = () => setBgImageLoaded(true);
    bgImg.src = bgImage;
  }, []);

  useEffect(() => {
    if (image) {
      const productImg = new Image();
      productImg.onload = () => setImageLoaded(true);
      productImg.onerror = () => {
        console.warn(`Failed to load product image: ${image}`);
        setImageLoaded(true);
      };
      productImg.src = image;
    } else {
      setImageLoaded(true);
    }
  }, [image]);

  useEffect(() => {
    if (!imageLoaded || !bgImageLoaded || !title || !price) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(titleRef.current, {
      text: `Name: ${title}`,
      duration: 1.5,
      ease: 'none',
    })
      .to(priceRef.current, {
        text: `Price: ${price} (Only COD)`,
        duration: 1.5,
        ease: 'none',
        delay: 0.3,
      })
      .to(emailRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(addressRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.3")
      .to(pincodeRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.3")
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.3")
      .to(imageRef.current, { opacity: 1 });
  }, [title, price, imageLoaded, bgImageLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const pincode = pincodeRef.current.value.trim();

    if (!email || !address || !pincode) {
      gsap.fromTo(
        deniedRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          onComplete: () => {
            gsap.to(deniedRef.current, {
              opacity: 0,
              y: -10,
              duration: 0.5,
              delay: 3,
            });
          },
        }
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.email) {
      const ordersKey = `orders_${user.email}`;
      const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      const newOrder = { title, price, image, date: new Date().toISOString() };
      localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));
    }

    gsap.to(cardRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setSubmitted(true);
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => {
            if (successTextRef.current) {
              gsap.fromTo(
                successTextRef.current,
                { opacity: 0 },
                {
                  text: `${title} will be delivered to your coordinates.`,
                  duration: 2.5,
                  ease: 'none',
                  opacity: 1,
                  delay: 0.3,
                  onComplete: () => {
                    setTimeout(() => {
                      navigate('/');
                    }, 2000);
                  },
                }
              );
            }
          }, 100);
        }, 100);
      },
    });
  };

  const handleInputChange = () => {
    if (deniedRef.current) {
      gsap.to(deniedRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
      });
    }
  };

  if (!imageLoaded || !bgImageLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!submitted ? (
        <div
          className="rounded-md shadow-lg relative flex justify-between items-center"
          ref={cardRef}
          style={{
            width: window.innerWidth <= 768 ? '85vw' : '46.875vw', // Larger on mobile
            height: window.innerWidth <= 768 ? '70vh' : '48.15vh', // Larger on mobile
            gap: window.innerWidth <= 768 ? '2vw' : '0.3125vw',
            paddingLeft: window.innerWidth <= 768 ? '3vw' : '0.625vw',
            paddingRight: window.innerWidth <= 768 ? '3vw' : '0.625vw',
            paddingTop: window.innerWidth <= 768 ? '3vh' : '0.926vh',
            paddingBottom: window.innerWidth <= 768 ? '3vh' : '0.926vh',
          }}
        >
          <div
            ref={deniedRef}
            className="absolute text-red-500 font-['Audiowide-Regular','Courier_New',monospace] opacity-0 z-50"
            style={{
              top: '0.37vh', // 4px
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.729vw', // 14px at 1920px
            }}
          >
            Access Denied — All fields must be completed to secure transition.
          </div>

          <div 
            className="flex flex-col"
            style={{
              width: '50%',
              gap: '0.37vh', // 4px gap
            }}
          >
            <p 
              ref={titleRef} 
              className="text-white font-['Audiowide-Regular'] whitespace-pre-wrap"
              style={{ fontSize: window.innerWidth <= 768 ? '3vw' : '0.729vw' }} // Larger on mobile
            ></p>
            <p 
              ref={priceRef} 
              className="text-white font-['Audiowide-Regular'] whitespace-pre-wrap"
              style={{ fontSize: window.innerWidth <= 768 ? '3vw' : '0.729vw' }} // Larger on mobile
            ></p>

          <form
  onSubmit={handleSubmit}
  className="flex flex-col text-white font-['Audiowide-Regular']"
  style={{
    gap: window.innerWidth <= 768 ? '2vh' : '1.5vh',
    marginTop: window.innerWidth <= 768 ? '1vh' : '1vh',
    fontSize: window.innerWidth <= 768 ? '3vw' : '0.729vw',
  }}
>

              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                className="bg-transparent border-b-[1px] border-white focus:outline-none placeholder-white opacity-0 translate-y-4 transition-all"
                onChange={handleInputChange}
                required
              />
              <input
                ref={addressRef}
                type="text"
                placeholder="Address"
                className="bg-transparent border-b-[1px] border-white focus:outline-none placeholder-white opacity-0 translate-y-4 transition-all"
                onChange={handleInputChange}
                required
              />
              <input
                ref={pincodeRef}
                type="text"
                placeholder="Pincode"
                className="bg-transparent border-b-[1px] border-white focus:outline-none placeholder-white opacity-0 translate-y-4 transition-all"
                onChange={handleInputChange}
                required
              />

              <button
                ref={btnRef}
                type="submit"
                className="w-max bg-white cursor-pointer text-black font-bold rounded hover:bg-gray-200 opacity-0 translate-y-4 transition-all"
                style={{
                  marginTop: window.innerWidth <= 768 ? '2vh' : '0.37vh',
                  paddingTop: window.innerWidth <= 768 ? '1vh' : '0.093vh',
                  paddingBottom: window.innerWidth <= 768 ? '1vh' : '0.093vh',
                  paddingLeft: window.innerWidth <= 768 ? '3vw' : '0.208vw',
                  paddingRight: window.innerWidth <= 768 ? '3vw' : '0.208vw',
                  fontSize: window.innerWidth <= 768 ? '3vw' : '0.729vw',
                }}
              >
                Confirm Purchase
              </button>
            </form>
          </div>

          {window.innerWidth > 768 && (
  <div
    className="flex items-center justify-center"
    style={{
      width: '50%',
      height: '100%',
    }}
  >
    <img
      ref={imageRef}
      src={image}
      alt="Product"
      className="object-contain opacity-0 transition-opacity duration-1000"
      style={{
        height: '70%',
        maxWidth: '70%',
      }}
    />
  </div>
)}

        </div>
      ) : (
        showSuccess && (
          <div
            ref={successTextRef}
            className="text-white font-['Audiowide-Regular'] text-center opacity-0"
            style={{
              fontSize: window.innerWidth <= 768 ? '4vw' : '1.042vw', // Larger on mobile
            }}
          >
            {title} will be delivered to your coordinates.
          </div>
        )
      )}
    </div>
  );
};

export default PurchaseCard;