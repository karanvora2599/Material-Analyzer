import Navbar from "./components/Navbar";
import Analyzer from "./components/Analyzer";
import React from "react";
import { useTheme } from "./ThemeContext";     // already created earlier
import ampLight from "/Asset.png";
import ampDark  from "/Asset.png";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-1">
        Material
        <img
          src={useTheme().theme === "dark" ? ampDark : ampLight}
          alt="&"
          className="inline-block h-7 w-7 translate-y-[1px] transition-opacity duration-300"
        />
        Texture&nbsp;Analyzer
        </h2>
        <Analyzer />
      </main>
    </>
  );
}