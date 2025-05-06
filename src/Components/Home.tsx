

function Home() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-white min-h-screen pt-24 pb-4 px-4">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-6 leading-tight">
          Take Control of Your Money
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
          Your all-in-one platform to track spending, budget wisely, and achieve your financial goals.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition shadow-lg text-lg cursor-pointer">
          Start Tracking Now
        </button>
      </div>

      {/* Quotes Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Track Your Expenses?</h2>
        <div className="grid gap-8 md:grid-cols-2">
        {quotes.map((quote, index) => (
  <div
    key={index}
    className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition ${
      index === quotes.length - 1 ? 'md:col-span-2 mx-auto max-w-md' : ''
    }`}
  >
    <p className="text-gray-700 italic">"{quote}"</p>
  </div>
))}

        </div>
      </div>
    </section>
  );
};

const quotes = [
  "Budgeting isn’t about limiting yourself — it’s about making the things that matter possible.",
  "Small leaks sink big ships — keep an eye on your spending.",
  "Budgeting is telling your money where to go instead of wondering where it went.",
  "The secret to getting ahead is getting started — with your expenses.",
  "A budget is telling your money where to go instead of wondering where it went."
];

export default Home;
