import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { fetchAllRecipes } from "../utils/api";
import type { Recipe } from "..";
import RecipeCard from "../components/RecipeCard";
import CardSkeleton from "../components/CardSkeleton";

const Favorites = () => {
	const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const { favorites } = useFavorites();

	useEffect(() => {
		fetchAllRecipes()
			.then((data) => {
				setAllRecipes(data.recipes);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const favoriteRecipes = allRecipes.filter((r) => favorites.includes(r.id));

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8 flex items-center gap-3">
					<div>
						<h1 className="text-4xl font-bold text-gray-900">My Favorites</h1>
						<p className="text-gray-600">
							{favorites.length} recipe{favorites.length !== 1 ? "s" : ""} saved
							{favorites.length !== 1 ? "s" : ""}
						</p>
					</div>
				</div>

				{loading ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(3)].map((_, i) => (
							<CardSkeleton key={i} />
						))}
					</div>
				) : favoriteRecipes.length === 0 ? (
					<div className="text-center py-24">
						<Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
						<p className="text-xl text-gray-500">No favorite recipes found</p>
						<p className="text-gray-400 mt-1">
							Click the heart icon on a recipe to save it here.
						</p>
					</div>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{favoriteRecipes.map((recipe) => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorites;
