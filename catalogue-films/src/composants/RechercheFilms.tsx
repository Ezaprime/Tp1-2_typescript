import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useFetch, useDebounce } from "../hooks/useFetch";
import { urlRecherche } from "../lib/omdb";
import type { ReponseRecherche } from "../lib/omdb";
import { CarteFilm } from "./CarteFilm";

export function RechercheFilms() {
  const [terme, setTerme] = useState("");
  const termeDiffere = useDebounce(terme, 400);

  const termeNettoye = terme.trim();
  const termeDiffereNettoye = termeDiffere.trim();

  const url = termeDiffereNettoye ? urlRecherche(termeDiffereNettoye) : null;
  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(url);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    setTerme(e.target.value);
  };

  const enChargement = chargement || (termeNettoye !== "" && termeNettoye !== termeDiffereNettoye);

  const films = donnees && donnees.Response === "True" ? (donnees.Search ?? []) : [];

  return (
    <div>
      <input
        type="text"
        value={terme}
        onChange={gererSaisie}
        placeholder="Rechercher un film…"
        aria-label="Rechercher un film"
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="mt-6">
        {termeNettoye === "" && (
          <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">
            Tapez un titre pour lancer la recherche.
          </p>
        )}

        {termeNettoye !== "" && enChargement && (
          <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">Chargement…</p>
        )}

        {termeNettoye !== "" && !enChargement && erreur && (
          <p className="rounded-lg bg-red-50 p-8 text-center text-red-600">{erreur}</p>
        )}

        {termeNettoye !== "" && !enChargement && !erreur && films.length === 0 && (
          <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">
            Aucun film ne correspond à « {termeDiffereNettoye} ».
          </p>
        )}

        {termeNettoye !== "" && !enChargement && !erreur && films.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {films.map((film) => (
              <li key={film.imdbID}>
                <Link to={`/films/${film.imdbID}`}>
                  <CarteFilm film={film} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
