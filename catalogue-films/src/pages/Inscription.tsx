import { useState } from "react";
import { FormulaireInscription } from "../composants/FormulaireInscription";
import { ListeInscriptions } from "../composants/ListeInscriptions";
import type { Inscription, InscriptionEnregistree } from "../lib/inscription";

let prochainId = 1;

export function InscriptionPage() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const gererInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      id: prochainId++,
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
    };
    setInscriptions((liste) => [nouvelle, ...liste]);
  };

  const gererSuppression = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Inscription</h2>
        <FormulaireInscription onInscription={gererInscription} />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Inscriptions</h2>
        <ListeInscriptions inscriptions={inscriptions} onSuppression={gererSuppression} />
      </div>
    </div>
  );
}
