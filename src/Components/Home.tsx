import { motion } from "framer-motion";

function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <section className="flex-1 pt-24 pb-12 px-6">
          {/* Hero Section */}
          <motion.div
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 leading-tight">
                Master Your Finances with Confidence
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Visualize, manage, and take control of your financial future — all in one intuitive dashboard.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg text-lg"
              >
                Get Started
              </motion.button>
            </div>
            <motion.img
              src="../../public/financeIllustration2.jpg"
              alt="Finance illustration"
              className="w-full max-w-md mx-auto "
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="mt-20 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
              Features Designed to Empower You
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl cursor-pointer flex flex-col items-center text-center"
                  whileHover={{ rotateY: 8, rotateX: 6, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-24 h-24 mb-4"
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
    </>
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
