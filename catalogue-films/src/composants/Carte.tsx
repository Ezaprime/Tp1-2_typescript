// Consigne 3 — Carte
// Un bloc sur fond blanc, coins arrondis, ombre legere, qui affiche
// dans l'ordre : titre, sousTitre (si fourni), children, actions (si fourni).
// La carte ne decide jamais de son contenu : elle l'accueille.

import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode; // pied de carte, optionnel
}

// A ECRIRE :
// la fonction Carte, avec un affichage conditionnel pour sousTitre et actions

export function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <article className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-900">{titre}</h3>
      {sousTitre && <p className="mt-0.5 text-sm text-slate-500">{sousTitre}</p>}
      <div className="mt-3">{children}</div>
      {actions && <div className="mt-4">{actions}</div>}
    </article>
  );
}