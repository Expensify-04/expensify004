import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import { features } from "../Data/Features";
import type { Feature } from "../Types/Types";
import finance from '../assets/finances.png';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, easing: (t: number) => t });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (


    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white">


      <section className="flex-1 px-6 pt-24 pb-12">
        <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-cyan-500 md:text-5xl">
              Master Your Finances with Confidence
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Visualize, manage, and take control of your financial future — all in one intuitive dashboard.
            </p>
            <motion.button
              onClick={() => navigate("/signin")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-lg text-white transition rounded-lg shadow-lg bg-cyan-600 hover:bg-cyan-600"
            >
              Get Started
            </motion.button>
          </motion.div>
          <img
            src={finance}
            alt="Finance illustration"
            className="mx-auto w-60 h-60"
          />
        </div>



        <motion.div
          className="max-w-6xl mx-auto mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
            Features Designed to Empower You
          </h2>
          <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature: Feature, index: number) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 text-center bg-white shadow-md cursor-pointer rounded-xl hover:shadow-2xl"
                whileHover={{ rotateY: 8, rotateX: 6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <img src={feature.img} alt={feature.title} className="w-24 h-24 mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-cyan-500">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>




      <section className="px-4 py-16 font-sans text-gray-900 bg-cyan-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-cyan-900 animate-bounce">
            Track Your Finances
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-800">
            Wealth is not about having a lot of money — it’s about having control over your money.
          </p>
          <div className="flex justify-center">
            <motion.button
              onClick={() => navigate("/signin")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-lg font-medium text-white transition rounded-full shadow-md bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg"
            >
              Let's Save
            </motion.button>


            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
