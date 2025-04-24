import logo from "/logo.png";

export default function Navbar() {
  const links = ["Home", "Analyzer", "Explore", "Profile"];
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={logo} className="h-8 w-auto" alt="Grain & co." />
        <span className="font-semibold text-xl hidden sm:inline">Grain &co.</span>
      </div>
      <nav className="space-x-8 text-sm font-medium">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="hover:text-sky-600 transition-colors duration-150"
          >
            {l}
          </a>
        ))}
      </nav>
    </header>
  );
}