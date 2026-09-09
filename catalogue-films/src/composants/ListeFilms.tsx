// Consigne 5 — ListeFilms
// Assemble les trois autres composants : une <ul> en grille, une <li>
// par film avec sa key, et dans chaque <li> une Carte.

import type { Film, StatutFilm } from "../lib/utils";
import type { TonBadge } from "./Badge";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import { Carte } from "./Carte";

export interface ListeFilmsProps {
  films: Film[];
  messageVide?: string;
  onSelection?: (film: Film) => void;
}

// 1. la table statut -> { libelle, ton }, indexee par StatutFilm
const statuts: Record<StatutFilm, { libelle: string; ton: TonBadge }> = {
  vu: { libelle: "Déjà vu", ton: "succes" },
  a_voir: { libelle: "À voir", ton: "info" },
  abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export function ListeFilms({
  films,
  messageVide = "Aucun film dans cette sélection.",
  onSelection,
}: ListeFilmsProps) {
  // 2. le cas liste vide, EN PREMIER, par un retour anticipe
  if (films.length === 0) {
    return (
      <p className="rounded-lg bg-slate-100 p-8 text-center text-slate-500">{messageVide}</p>
    );
  }

  // 3. la <ul> en grille : 1 colonne, md:2, lg:4
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 4. une <li key={film.id}> par film, contenant une Carte */}
      {films.map((film) => (
        <li key={film.id}>
          <Carte
            titre={film.titre}
            sousTitre={`${film.annee} — ${film.note.toFixed(1)}/10`}
            actions={
              onSelection ? (
                <Bouton
                  libelle="Détails"
                  variante="secondaire"
                  onClick={() => onSelection(film)}
                />
              ) : undefined
            }
          >
            <div className="flex flex-wrap gap-1.5">
              <Badge texte={statuts[film.statut].libelle} ton={statuts[film.statut].ton} />
              {film.genres.map((genre) => (
                <Badge key={genre} texte={genre} />
              ))}
            </div>
          </Carte>
        </li>
      ))}
    </ul>
  );
}