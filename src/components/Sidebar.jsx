export const Sidebar = () => {
  return (
    <nav className="flex-col space-y-4 fixed top-28 left-6 z-30 hidden md:flex">
      {/* GitHub */}
      <div className="relative group font-medium rounded-lg fade-out-bg  md:hover:scale-110 transition duration-300">
        <a
          href="https://github.com/ant1po1e"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl shadow-lg text-white md:hover:bg-blue-800/50 group"
        >
          <i className="bi bi-github md:group-hover:text-5xl md:group-hover:text-white transition-all duration-300"></i>
        </a>
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-5 py-2 rounded-md bg-blue-800/50 text-white text-sm opacity-0 md:group-hover:opacity-100 transition duration-300 whitespace-nowrap pointer-events-none shadow-lg">
          GitHub
        </span>
      </div>
    </nav>
  );
};
