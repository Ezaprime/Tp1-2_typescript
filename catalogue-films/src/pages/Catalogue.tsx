import { FILMS, trierPar, filtrerParGenre, formaterTitre } from "../lib/utils";
import { ListeFilms } from "../composants/ListeFilms";
import { Bouton } from "../composants/Bouton";

const parTitre = trierPar(FILMS, "titre");
const drames = filtrerParGenre(FILMS, "Drame");
const documentaires = filtrerParGenre(FILMS, "Documentaire");

export function Catalogue() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Catalogue de films</h1>
        <p className="mt-1 text-slate-500">
          {FILMS.length} films, composants typés et mise en forme Tailwind.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Tous les films</h2>
        <ListeFilms
          films={parTitre}
          onSelection={(film) => alert(formaterTitre(film.titre, film.annee))}
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Drames</h2>
        <ListeFilms films={drames} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Documentaires</h2>
        <ListeFilms
          films={documentaires}
          messageVide="Aucun documentaire dans le catalogue pour le moment."
        />
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Les quatre états du composant Bouton
        </h2>
        <div className="flex flex-wrap gap-3">
          <Bouton libelle="Action principale" />
          <Bouton libelle="Action secondaire" variante="secondaire" />
          <Bouton libelle="Supprimer" variante="danger" />
          <Bouton libelle="Indisponible" desactive />
        </div>
      </section>
    </div>
  );
}
