import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

function Home() {
  const imgRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]); // Parallax effect

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white font-sans">
      {/* Hero Section */}
      <section className="flex-1 pt-24 pb-12 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 leading-tight">
              Master Your Finances with Confidence
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Visualize, manage, and take control of your financial future — all in one intuitive dashboard.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md text-lg"
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.img
            ref={imgRef}
            src="../../public/financeIllustration2.jpg"
            alt="Finance illustration"
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-24 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            Features Designed to Empower You
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-transform flex flex-col items-center text-center"
                whileHover={{ rotateY: 8, rotateX: 6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-20 h-20 mb-4 object-contain"
                />
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Smart Budgeting",
    description: "Create personalized budgets and track spending with ease.",
    img: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
  },
  {
    title: "Goal Tracking",
    description: "Set savings goals and watch your progress in real-time.",
    img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
  },
  {
    title: "Expense Breakdown",
    description: "Visualize your expenses with clean, intuitive charts.",
    img: "https://cdn-icons-png.flaticon.com/512/2907/2907242.png",
  },
  {
    title: "Bill Reminders",
    description: "Never miss a payment again with timely alerts.",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },
  {
    title: "Insights & Reports",
    description: "Get detailed analytics to make smarter decisions.",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    title: "Secure & Private",
    description: "Your financial data is protected with bank-grade security.",
    img: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  },
];

export default Home;
