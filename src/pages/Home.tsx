import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "..";
import { api } from "../utils/api";

export default function ZestysCookingHomepage() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const topRated = await api.get("/recipes", {
					params: { limit: 6, sortBy: "rating", order: "desc" },
				});

				setRecipes(topRated.data.recipes);
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
			<section className="mx-auto mt-8 flex max-w-6xl items-center justify-between rounded-3xl px-6 py-20 text-white bg-linear-to-br from-yellow to-orange">
				<div className="flex flex-col items-start">
					<h2 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl text-mirage">
						Découvre les recettes les mieux notées
					</h2>
					<p className="mt-6 max-w-2xl text-lg text-mirage">
						Une page simple pour trouver rapidement les meilleures recettes.
					</p>
					<Link
						to="/recipes"
						className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold shadow text-mirage"
					>
						Voir les recettes
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<img
					src="Zesty's Cooking.png"
					alt="logo"
					className="w-60 object-contain hidden md:block"
				/>
			</section>
			<section className="mx-auto max-w-6xl px-6 py-16">
				<div className="mb-8 flex items-center justify-between">
					<h3 className="text-3xl font-bold text-mirage">
						Meilleures recettes
					</h3>
					<Link to="/recipes" className="font-medium text-orange">
						Voir tout
						<ArrowRight className="h-4 w-4 inline-block ml-1" />
					</Link>
				</div>

				{loading ? (
					<p className="text-slate-600">Chargement des recettes...</p>
				) : (
					<div className="grid gap-6 md:grid-cols-3">
						{recipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				)}
			</section>
		</main>
	);
}
