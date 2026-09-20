import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
}: ChampTexteProps) {
  const idErreur = `${nom}-erreur`;

  return (
    <div>
      <label htmlFor={nom} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? idErreur : undefined}
        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          erreur
            ? "border-red-500 focus:ring-red-400"
            : "border-slate-300 focus:ring-blue-400"
        }`}
      />
      {erreur && (
        <p id={idErreur} className="mt-1 text-sm text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}
