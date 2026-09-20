import { Link } from "react-router-dom";
import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return (
      <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">
        Aucun favori pour le moment.
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Favoris</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {favoris.map((film) => (
          <li key={film.imdbID} className="flex flex-col gap-2">
            <Link to={`/films/${film.imdbID}`}>
              <CarteFilm film={film} />
            </Link>
            <Bouton
              libelle="Retirer"
              variante="danger"
              onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
