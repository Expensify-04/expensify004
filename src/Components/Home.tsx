import {motion} from "framer-motion";

function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <section className="flex-1 px-6 pt-24 pb-12">
          {/* Hero Section */}
          <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">
            <motion.div
              className="text-center md:text-left"
              initial={{opacity: 0, y: -30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-indigo-700 md:text-5xl">
                Master Your Finances with Confidence
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Visualize, manage, and take control of your financial future — all in one intuitive
                dashboard.
              </p>
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="px-6 py-3 text-lg text-white transition bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700">
                Get Started
              </motion.button>
            </motion.div>
            <img
              src="../../financeIllustration2.jpg"
              alt="Finance illustration"
              className="w-full max-w-md mx-auto "
            />
          </div>

          {/* Features Section */}
          <motion.div
            className="max-w-6xl mx-auto mt-20"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3, duration: 0.6}}>
            <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
              Features Designed to Empower You
            </h2>
            <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-6 text-center bg-white shadow-md cursor-pointer rounded-xl hover:shadow-2xl"
                  whileHover={{rotateY: 8, rotateX: 6, scale: 1.04}}
                  transition={{type: "spring", stiffness: 200, damping: 12}}>
                  <img src={feature.img} alt={feature.title} className="w-24 h-24 mb-4" />
                  <h3 className="mb-2 text-xl font-semibold text-indigo-700">{feature.title}</h3>
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
