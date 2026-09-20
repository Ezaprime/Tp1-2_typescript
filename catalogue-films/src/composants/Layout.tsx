import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { Bouton } from "./Bouton";

const lienActif = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold text-blue-600" : "text-slate-600 hover:text-slate-900";

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <NavLink to="/" end className={lienActif}>
              Accueil
            </NavLink>
            <NavLink to="/recherche" className={lienActif}>
              Recherche
            </NavLink>
            <NavLink to="/favoris" className={lienActif}>
              Favoris ({favoris.length})
            </NavLink>
            <NavLink to="/catalogue" className={lienActif}>
              Catalogue
            </NavLink>
            <NavLink to="/inscription" className={lienActif}>
              Inscription
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 text-sm">
            {pseudo ? (
              <>
                <span className="text-slate-600">
                  Connecté en tant que <strong>{pseudo}</strong>
                </span>
                <Bouton libelle="Déconnexion" variante="secondaire" onClick={deconnecter} />
              </>
            ) : (
              <NavLink to="/connexion" className={lienActif}>
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-400">
        Catalogue de films — projet de TP React + TypeScript
      </footer>
    </div>
  );
}
