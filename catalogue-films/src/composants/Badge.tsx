// Consigne 4 — Badge
// Une petite pastille arrondie qui affiche un texte court.
// Non cliquable : ni onClick, ni disabled, ni hover.

// --- 1. LES TYPES (donnes par le sujet) --------------------------------

export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge; // "neutre" par defaut
}

// --- 2. LA TABLE DES TONS ----------------------------------------------
// A ECRIRE : un Record<TonBadge, string>, QUATRE entrees.
// Principe d'une pastille : fond pale (nuance 100), texte fonce (700/800)
// de la meme famille de couleur.
//
//   neutre     bg-slate-100  text-slate-700
//   succes     bg-green-100  text-green-800
//   info       bg-blue-100   text-blue-800
//   attention  bg-amber-100  text-amber-800

const tons : Record<TonBadge, string> = {
  neutre: "bg-slate-100 text-slate-700",
  succes: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  attention: "bg-amber-100 text-amber-800",
}



// --- 3. LE COMPOSANT ---------------------------------------------------
// A ECRIRE : la fonction Badge.
//
//   export function Badge({ ... }: BadgeProps) {
//     return <span className={ }>{ }</span>;
//   }
//
// Classes fixes : inline-block rounded-full px-2 py-0.5 text-xs font-medium
// Classe variable : celle du ton, via la table.
// Le className est un template literal, comme dans Bouton.tsx.

export function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tons[ton]}`}>
      {texte}
    </span>
  );
}