import { Link } from "react-router-dom";

export function PageIntrouvable() {
  return (
    <div className="text-center">
      <p className="text-lg text-slate-600">Cette page n'existe pas.</p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
