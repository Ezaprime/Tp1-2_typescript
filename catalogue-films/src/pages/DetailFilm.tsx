import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { urlDetail, afficheDisponible } from "../lib/omdb";
import type { FilmDetailOmdb } from "../lib/omdb";
import { useFavoris } from "../contextes/FavorisContext";
import { Bouton } from "../composants/Bouton";
import { Badge } from "../composants/Badge";

export function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (chargement) {
    return <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">Chargement…</p>;
  }

  if (erreur) {
    return <p className="rounded-lg bg-red-50 p-8 text-center text-red-600">{erreur}</p>;
  }

  if (!donnees || donnees.Response === "False") {
    return (
      <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">
        Ce film est introuvable.
      </p>
    );
  }

  const dejaFavori = favoris.some((film) => film.imdbID === donnees.imdbID);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {afficheDisponible(donnees.Poster) ? (
        <img
          src={donnees.Poster}
          alt={`Affiche de ${donnees.Title}`}
          className="w-full max-w-xs rounded-lg object-cover shadow-sm"
        />
      ) : (
        <div className="flex h-96 w-full max-w-xs items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
          Pas d'affiche
        </div>
      )}

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-900">
          {donnees.Title} <span className="font-normal text-slate-500">({donnees.Year})</span>
        </h1>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {donnees.Genre.split(",").map((genre) => (
            <Badge key={genre.trim()} texte={genre.trim()} ton="info" />
          ))}
          {donnees.imdbRating !== "N/A" && (
            <Badge texte={`⭐ ${donnees.imdbRating}/10`} ton="attention" />
          )}
        </div>

        <p className="mt-4 text-sm text-slate-600">
          {donnees.Runtime !== "N/A" ? donnees.Runtime : "Durée inconnue"}
        </p>

        <p className="mt-4 text-slate-700">{donnees.Plot}</p>

        <div className="mt-6">
          <Bouton
            libelle={dejaFavori ? "Déjà dans les favoris" : "Ajouter aux favoris"}
            desactive={dejaFavori}
            onClick={() => dispatch({ type: "ajouter", film: donnees })}
          />
        </div>
      </div>
    </div>
  );
}
