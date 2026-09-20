import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { Bouton } from "../composants/Bouton";

interface EtatNavigation {
  de?: Location;
}

export function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const { connecter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
    setErreur(null);
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pseudo.trim().length === 0) {
      setErreur("Le pseudo ne peut pas être vide.");
      return;
    }

    connecter(pseudo.trim());

    const etat = location.state as EtatNavigation | null;
    const destination = etat?.de ? `${etat.de.pathname}${etat.de.search}` : "/";
    navigate(destination, { replace: true });
  };

  return (
    <div className="max-w-sm">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Connexion</h1>
      <form onSubmit={gererEnvoi} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium text-slate-700">
            Pseudo
          </label>
          <input
            id="pseudo"
            name="pseudo"
            type="text"
            value={pseudo}
            onChange={gererSaisie}
            aria-invalid={!!erreur}
            aria-describedby={erreur ? "pseudo-erreur" : undefined}
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              erreur ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:ring-blue-400"
            }`}
          />
          {erreur && (
            <p id="pseudo-erreur" className="mt-1 text-sm text-red-600">
              {erreur}
            </p>
          )}
        </div>
        <Bouton type="submit" libelle="Se connecter" />
      </form>
    </div>
  );
}
