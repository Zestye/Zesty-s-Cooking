import { Link, useParams } from "react-router";
import type { Recipe } from "..";
import { useEffect, useState } from "react";
import { fetchRecipeById } from "../utils/api";
import { useFavorites } from "../hooks/useFavorites";
import {
	ArrowLeft,
	Check,
	ChefHat,
	Clock,
	Flame,
	Heart,
	Star,
	Users,
} from "lucide-react";

export default function RecipeDetail() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
		new Set(),
	);
	const { isFavorite, toggleFavorite } = useFavorites();

	useEffect(() => {
		if (id) {
			fetchRecipeById(Number(id))
				.then((data) => {
					setRecipe(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Failed to fetch recipe:", error);
					setLoading(false);
				});
		}
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Loading recipe...</p>
				</div>
			</div>
		);
	}

	if (!recipe) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Recipe Not Found
					</h1>
					<Link to="/recipes" className="text-orange-600 hover:text-orange-700">
						Browse all recipes
					</Link>
				</div>
			</div>
		);
	}

	const toggleIngredient = (index: number) => {
		const newChecked = new Set(checkedIngredients);
		if (newChecked.has(index)) {
			newChecked.delete(index);
		} else {
			newChecked.add(index);
		}
		setCheckedIngredients(newChecked);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<Link
						to="/recipes"
						className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
						Back to Recipes
					</Link>
				</div>
			</div>

			<div className="relative h-100 bg-gray-900">
				<img
					src={recipe.image}
					alt={recipe.name}
					className="w-full h-full object-cover opacity-90"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-8">
					<div className="container mx-auto">
						<div className="flex items-center gap-3 mb-4">
							<div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
								{recipe.cuisine}
							</div>
							<div className="inline-flex items-center gap-1 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
								<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								{recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
							</div>
						</div>
						<div className="flex items-center gap-4 mb-2">
							<h1 className="text-4xl md:text-5xl font-bold text-white">
								{recipe.name}
							</h1>
							<button
								onClick={() => toggleFavorite(recipe.id)}
								className="shrink-0 bg-white/20 hover:bg-white/30 rounded-full p-2.5 transition-colors"
								aria-label={isFavorite(recipe.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
							>
								<Heart
									className={`h-6 w-6 ${isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-white"}`}
								/>
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{recipe.mealType.map((type: string) => (
								<span key={type} className="text-sm text-orange-200">
									{type}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-wrap gap-8">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
								<Clock className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Total Time</p>
								<p className="font-semibold text-gray-900">
									{recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
								<Users className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Servings</p>
								<p className="font-semibold text-gray-900">
									{recipe.servings} people
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
								<ChefHat className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Difficulty</p>
								<p className="font-semibold text-gray-900">
									{recipe.difficulty}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
								<Flame className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Calories</p>
								<p className="font-semibold text-gray-900">
									{recipe.caloriesPerServing} per serving
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Ingredients
							</h2>
							<ul className="space-y-3">
								{recipe.ingredients.map((ingredient: string, index: number) => (
									<li
										key={index}
										onClick={() => toggleIngredient(index)}
										className="flex items-start gap-3 cursor-pointer group"
									>
										<div
											className={`shrink-0 w-5 h-5 border-2 rounded flex items-center justify-center mt-0.5 transition-colors ${
												checkedIngredients.has(index)
													? "bg-orange-600 border-orange-600"
													: "border-gray-300 group-hover:border-orange-600"
											}`}
										>
											{checkedIngredients.has(index) && (
												<Check className="h-3 w-3 text-white" />
											)}
										</div>
										<span
											className={`flex-1 transition-all ${
												checkedIngredients.has(index)
													? "text-gray-400 line-through"
													: "text-gray-700"
											}`}
										>
											{ingredient}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-md p-6 mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Instructions
							</h2>
							<ol className="space-y-6">
								{recipe.instructions.map(
									(instruction: string, index: number) => (
										<li key={index} className="flex gap-4">
											<div className="shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
												{index + 1}
											</div>
											<p className="flex-1 text-gray-700 pt-1">{instruction}</p>
										</li>
									),
								)}
							</ol>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
							<div className="flex flex-wrap gap-2">
								{recipe.tags.map((tag: string, index: number) => (
									<span
										key={index}
										className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer"
									>
										#{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
