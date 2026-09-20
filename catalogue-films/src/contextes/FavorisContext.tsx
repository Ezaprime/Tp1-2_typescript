import { createContext, useContext, useEffect, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import type { FilmOmdb } from "../lib/omdb";

type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter": {
      const dejaPresent = etat.some((film) => film.imdbID === action.film.imdbID);
      if (dejaPresent) return etat;
      return [...etat, action.film];
    }
    case "retirer":
      return etat.filter((film) => film.imdbID !== action.id);
    case "vider":
      return [];
    default: {
      const jamais: never = action;
      return jamais;
    }
  }
}

const CLE_STOCKAGE = "favoris";

function chargerFavorisInitiaux(): FilmOmdb[] {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (brut === null) return [];
    const donnees: unknown = JSON.parse(brut);
    return Array.isArray(donnees) ? (donnees as FilmOmdb[]) : [];
  } catch {
    return [];
  }
}

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(reducerFavoris, [], chargerFavorisInitiaux);

  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
  }, [favoris]);

  return <Contexte.Provider value={{ favoris, dispatch }}>{children}</Contexte.Provider>;
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return contexte;
}
