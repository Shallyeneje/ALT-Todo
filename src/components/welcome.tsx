import pict1 from '../assets/image.png'

const Welcome = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center  text-white text-center px-4">
      <img src={pict1} alt="Welcome" className="w-11/12 mb-6 mt-[20px]" />
      <h1 className="text-2xl font-bold mb-2">Welcome to My Todo App 🚀</h1>
      <p className="text-lg font-medium">Plan your tasks today the smart way</p>
    </div>
  );
};

export default Welcome;
