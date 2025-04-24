import Navbar from "./components/Navbar";
import Analyzer from "./components/Analyzer";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Material & Texture Analyzer</h2>
        <Analyzer />
      </main>
    </>
  );
}