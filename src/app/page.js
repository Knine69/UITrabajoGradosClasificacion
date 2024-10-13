import Disclaimer from "./disclaimer/paje";
import HomePage from "./home/page";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container bg-[#71717a] shadow-lg rounded-lg py-8 md:p-16 mx-auto">
        <p className="text-4xl font-medium text-center mb-16">Biblioteca académica - GaUNAL</p>
        <HomePage />
        <Disclaimer />
      </div>
    </div>

  );
}
