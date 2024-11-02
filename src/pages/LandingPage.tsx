import "../../src/App.css";

const LandingPage = () => {
  return (
    <>
      <div className="background-image">
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            You
            <span className="bg-[#FF0000] text-white ml-1 p-2 rounded-2xl">
              History
            </span>
          </h1>
        </div>

        <div className="h-full flex justify-center place-items-center">
          <div className="bg-[#f24545] mb-28 text-white p-10 rounded-2xl m-4">
            <h2 className="text-2xl font-bold">Hello World</h2>
            <p className="text-lg">Welcome to YouHistory</p>
            <button className="bg-[#fff] text-black p-2 rounded-xl mt-4">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
