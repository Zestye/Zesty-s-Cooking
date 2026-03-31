import React, { useEffect, useState } from "react";
import { Search, ArrowRight, Star } from "lucide-react";

type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
  cookTimeMinutes: number;
};

const colors = {
  mirage: "#101828",
  orange: "#F59D47",
  yellow: "#F5CC59",
  cream: "#FFF4E8",
};

export default function ZestysCookingHomepage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();

        const topRated = data.recipes
          .sort((a: Recipe, b: Recipe) => b.rating - a.rating)
          .slice(0, 6);

        setRecipes(topRated);
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);


  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b fixed top-0 left-0 w-full z-10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="Zesty's Cooking.png"
              alt="Logo Zesty's Cooking"
              className="h-12 w-12 object-contain"
            />
            <h1 className="text-2xl font-bold" style={{ color: colors.mirage}}>
              Zesty&apos;s Cooking
            </h1>
          </a>
           <nav className="hidden gap-8 md:flex">
            <a href="/" className="text-sm font-medium text-slate-700 hover:text-black">
              Accueil
            </a>
            <a href="/recipes" className="text-sm font-medium text-slate-700 hover:text-black">
              Recettes
            </a>
            <a href="/favorites" className="text-sm font-medium text-slate-700 hover:text-black">
              Favoris
            </a>
          </nav>
        </div>
      </header>

      <section
        className="mx-auto mt-8 flex max-w-6xl flex-col items-start rounded-3xl px-6 py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${colors.yellow} 0%, ${colors.orange} 100%)` }}
      >
        <h2 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl" style={{ color: colors.mirage }}>
          Découvre les recettes les mieux notées
        </h2>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: colors.mirage}}>
          Une page simple pour trouver rapidement les meilleures recettes.
        </p>
        <a
          href="/recipes"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold shadow"
          style={{color: colors.mirage}}
        >
          Voir les recettes
          <ArrowRight className="h-4 w-4" />
        </a>
        <div className="hidden md:block">
          </div>
    <img
      src="Zesty's Cooking.png"
      alt="logo"
      className="w-60 object-contain"
    />
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-3xl font-bold" style={{ color: colors.mirage }}>
            Meilleures recettes
          </h3>
          <a href="/recipes" className="font-medium" style={{ color: colors.orange }}>
            Voir tout
          </a>
        </div>

        {loading ? (
          <p className="text-slate-600">Chargement des recettes...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {recipes.map((recipe) => (
              <article key={recipe.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <img src={recipe.image} alt={recipe.name} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium text-slate-700">{recipe.rating}/5</span>
                  </div>
                  <h4 className="text-xl font-semibold" style={{ color: colors.mirage }}>
                    {recipe.name}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Temps de cuisson : {recipe.cookTimeMinutes} min
                  </p>
                  </div>
              </article>
            ))}
          </div>
        )}
      </section>

        <footer className="mt-10" style={{ backgroundColor: colors.mirage }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-10 text-center text-white">
        </div>
      </footer>
    </main>
  );
}


        


