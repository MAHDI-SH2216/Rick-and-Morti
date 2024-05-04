import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO📽</div>
      <input type="text" className="text-field" placeholder="search ..." />
      {children}
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
    </nav>
  );
}

export default Navbar;

export function SearchResult({ numOfCharacters }) {
  return (
    <div className="navbar__result"> Found {numOfCharacters} characters</div>
  );
}
