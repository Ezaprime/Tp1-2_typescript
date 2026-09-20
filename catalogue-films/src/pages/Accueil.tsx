import { Link } from "react-router-dom";

export function Accueil() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Catalogue de films</h1>
      <p className="mt-4 text-slate-600">
        Recherchez des films dans la base OMDB, consultez leurs détails, et gardez les vôtres de
        côté dans une liste de favoris.
      </p>
      <p className="mt-2 text-slate-600">
        Connectez-vous pour accéder à vos favoris depuis n'importe quelle page.
      </p>
      <Link
        to="/recherche"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Lancer une recherche
      </Link>
    </div>
  );
}
