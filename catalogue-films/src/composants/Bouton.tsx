// Consigne 2 — Bouton
// Affiche un <button> contenant `libelle`, desactive quand `desactive`
// vaut true, et dont les classes Tailwind changent selon la variante.

export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton; // "primaire" par defaut
  desactive?: boolean;       // false par defaut
  onClick?: () => void;
}

// A ECRIRE :
// 1. un Record<VarianteBouton, string> avec les classes de chaque variante
const classes: Record<VarianteBouton, string> = {
  primaire: "bg-blue-600 text-white hover:bg-blue-700",
  secondaire: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
// 2. la fonction Bouton, avec les valeurs par defaut dans la destructuration
export function Bouton({
  libelle,
  variante = "primaire",
  desactive = false,
  onClick,
}: BoutonProps) {
  return (
    <button
      disabled={desactive}
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${classes[variante]}`}
    >
      {libelle}
    </button>
  );
}
