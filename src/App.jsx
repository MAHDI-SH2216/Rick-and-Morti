import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharacterDetaile from "./CharacterDetaile";
import CharacterList from "./CharacterList";
import Navbar, { SearchResult } from "./Navbar";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(data.results);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <SearchResult numOfCharacters={characters.length} />
      </Navbar>
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetaile />
      </div>
    </div>
  );
}

export default App;
