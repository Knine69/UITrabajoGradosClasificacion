import Disclaimer from "./disclaimer/paje";
import HomePage from "./home/page";

export default function Home() {
  return (
    <div className="mt-64">
      <p className="text-4xl font-medium text-center mb-24">Biblioteca académica - GaUNAL</p>
      <HomePage />
      <Disclaimer />
    </div>
  );
}
