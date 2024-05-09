import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
function CharacterDetaile({ selectedId, addToFavorites, isAddToFavourites }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat().slice(0,10));
        toast.success("Successfully toasted!");
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId, setIsLoading]);
  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "yellow" }}>
        {isLoading ? <Loading /> : ""}
        Please Select a Character .
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        addToFavorites={addToFavorites}
        isAddToFavourites={isAddToFavourites}
        character={character}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetaile;

function CharacterSubInfo({ addToFavorites, isAddToFavourites, character }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> -&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last Known location :</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourites ? (
            <p>Already Added TO Favourit ✔ </p>
          ) : (
            <button
              onClick={() => addToFavorites(character)}
              className="btn btn--primary"
            >
              Add to Favourit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
function EpisodeList({ episodes }) {
  const [sortBy, setSort] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>Lost Of epesodes</h2>
        <button
          onClick={() => setSort((is) => !is)}
          style={{ rotate: sortBy ? "0deg" : "180deg" }}
        >
          <ArrowUpCircleIcon className="icon" />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :&nbsp;
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
