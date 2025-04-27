import logoLight from "/logo.png";
import logoDark  from "/WHITE.png";
// import logo from "/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../ThemeContext";


export default function Navbar() {
  // const links = ["Home", "Analyzer", "Explore", "Profile"];
  const links = [];
  const { theme } = useTheme();  

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-3 shadow-sm bg-surface-light dark:bg-navDark backdrop-blur-md glass-edge dark:text-neutral-100 sticky top-0 z-50">
      {/* left side */}
      <div className="flex items-center">
        {/* <img src={logo} alt="Grain & co." className="h-8 w-auto" /> */}
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="Grain & co."
          className="h-8 w-auto transition-opacity duration-300"
        />
        {/* remove the span below ↓ if you don’t want the text */}
        {/* <span className="font-semibold text-xl hidden sm:inline ml-3">Grain &co.</span> */}
      </div>

      {/* right-side links */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        {links.map((l) => (
          <a key={l} href="#" className="hover:text-sky-600 transition-colors">
            {l}
          </a>
        ))}
         {/* dark-mode switch */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
