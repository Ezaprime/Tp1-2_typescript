import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { valider, valeursInitiales } from "../lib/inscription";
import type { Inscription } from "../lib/inscription";
import type { Erreurs } from "../lib/inscription";
import { ChampTexte } from "./ChampTexte";
import { Bouton } from "./Bouton";

export interface FormulaireInscriptionProps {
  onInscription: (donnees: Inscription) => void;
}

export function FormulaireInscription({ onInscription }: FormulaireInscriptionProps) {
  const [donnees, setDonnees] = useState<Inscription>(valeursInitiales);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const valeur = type === "checkbox" ? checked : value;
    setDonnees((d) => ({ ...d, [name]: valeur }));
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trouvees = valider(donnees);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) return;

    setEnvoiEnCours(true);
    window.setTimeout(() => {
      onInscription(donnees);
      setDonnees(valeursInitiales);
      setErreurs({});
      setEnvoiEnCours(false);
    }, 600);
  };

  return (
    <form onSubmit={gererEnvoi} noValidate className="flex flex-col gap-4">
      <ChampTexte
        nom="prenom"
        label="Prénom"
        valeur={donnees.prenom}
        onChange={gererSaisie}
        erreur={erreurs.prenom}
        placeholder="Ada"
      />
      <ChampTexte
        nom="email"
        label="Email"
        type="email"
        valeur={donnees.email}
        onChange={gererSaisie}
        erreur={erreurs.email}
        placeholder="ada@exemple.com"
      />
      <ChampTexte
        nom="motDePasse"
        label="Mot de passe"
        type="password"
        valeur={donnees.motDePasse}
        onChange={gererSaisie}
        erreur={erreurs.motDePasse}
      />
      <ChampTexte
        nom="confirmation"
        label="Confirmation du mot de passe"
        type="password"
        valeur={donnees.confirmation}
        onChange={gererSaisie}
        erreur={erreurs.confirmation}
      />

      <div>
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="cgv"
            checked={donnees.cgv}
            onChange={gererSaisie}
            aria-invalid={!!erreurs.cgv}
            aria-describedby={erreurs.cgv ? "cgv-erreur" : undefined}
            className="mt-0.5"
          />
          J'accepte les conditions générales de vente
        </label>
        {erreurs.cgv && (
          <p id="cgv-erreur" className="mt-1 text-sm text-red-600">
            {erreurs.cgv}
          </p>
        )}
      </div>

      <Bouton
        type="submit"
        libelle={envoiEnCours ? "Envoi en cours…" : "S'inscrire"}
        desactive={envoiEnCours}
      />
    </form>
  );
}
