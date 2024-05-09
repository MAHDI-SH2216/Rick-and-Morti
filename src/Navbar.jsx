import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "./CharacterList";
import Modal from "./Modal";

function Navbar({ children, favourit, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} onOpen={setIsOpen} title="List Of Favourit">
        {favourit.map((item) => (
          <Character item={item} key={item.id}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <nav className="navbar">
        <div className="navbar__logo">LOGO📽</div>
        {children}
        <button className="heart" onClick={() => setIsOpen((is) => !is)}>
          <HeartIcon className="icon" />
          <span className="badge">{favourit.length}</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;

export function SearchResult({ numOfCharacters }) {
  return (
    <div className="navbar__result"> Found {numOfCharacters} characters</div>
  );
}
export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search ..."
    />
  );
}
