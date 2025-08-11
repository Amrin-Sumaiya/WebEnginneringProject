


const Home = () => {


  return (
    <div className="bg-purple-50 text-gray-800">
      <section className="text-center py-16 px-4 bg-gradient-to-r from-blue-100 to-purple-100 shadow-md">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">Whether You're Adopting or Rescuing</h2>
        <p className="mt-4 text-lg text-gray-600">
          Search for adoptable pets near you and give them a forever home.
        </p>
          <h3 className="mt-6 text-xl font-semibold text-blue-700">
    Start Here ↓
  </h3>
  <div className="mt-6 flex justify-center gap-4 flex-wrap">
    <a
      href="/browse"
      className="bg-blue-400 text-white text-xl px-6 py-2 hover:bg-blue-600 rounded-full transition duration-300"
    >
      Browse Adoptable Pets
    </a>
    <a
      href="/rescue"
      className="bg-blue-400 text-white text-xl px-6 py-2 hover:bg-blue-600 rounded-full transition duration-300"
    >
      Join as a Rescuer
    </a>
    </div>
      </section>

    </div>
  );
};

export default Home;
