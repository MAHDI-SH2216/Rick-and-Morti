import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetaile from "./CharacterDetaile";
import CharacterList from "./CharacterList";
import Navbar, { Search, SearchResult } from "./Navbar";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectId] = useState(null);
  const [favourit, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );
  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourit));
  }, [favourit]);
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => setCount(count + 1), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    //!
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    //!
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  function handleFavourites(character) {
    return setFavourite((prevFavourit) => [...prevFavourit, character]);
  }
  const isAddToFavourites = favourit.map((c) => c.id).includes(selectedId);

  return (
    <div className="app">
      {/* <div style={{ color: "red" }}>{count}</div> */}
      <Toaster />
      <Navbar
        favourit={favourit}
        onDeleteFavourite={(id) =>
          setFavourite(favourit.filter((fav) => fav.id !== id))
        }
      >
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfCharacters={characters.length} />
      </Navbar>
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters.slice(0, 5)}
          isLoading={isLoading}
          onSelectCharacter={(id) => {
            setSelectId((prevId) => (prevId === id ? null : id));
          }}
        />
        <CharacterDetaile
          selectedId={selectedId}
          addToFavorites={handleFavourites}
          isAddToFavourites={isAddToFavourites}
        />
      </div>
    </div>
  );
}

export default App;
