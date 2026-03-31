import { useEffect, useState } from "react";
import { fetchAllRecipes, fetchRecipeTags } from "../utils/api";
import type { Recipe } from "..";
import {
	ChevronLeft,
	ChevronRight,
	Search,
	SlidersHorizontal,
} from "lucide-react";
import CardSkeleton from "../components/CardSkeleton";
import RecipeCard from "../components/RecipeCard";

const RECIPES_PER_PAGE = 6;

const Recipes = () => {
	const [loading, setLoading] = useState(true);

	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

	const [currentPage, setCurrentPage] = useState(1);

	const [searchTerm, setSearchTerm] = useState("");

	const [cuisines, setCuisines] = useState<string[]>([]);
	const [selectedCuisine, setSelectedCuisine] = useState("all");

	const [difficulties, setDifficulties] = useState<string[]>([]);
	const [selectedDifficulty, setSelectedDifficulty] = useState("all");

	const [sortBy, setSortBy] = useState("name-asc");

	useEffect(() => {
		Promise.all([fetchAllRecipes(), fetchRecipeTags()])
			.then(([recipesData, tags]) => {
				setAllRecipes(recipesData.recipes);
				setRecipes(recipesData.recipes);

				const uniqueCuisines = Array.from(
					new Set(recipesData.recipes.map((r) => r.cuisine)),
				).sort();
				setCuisines(uniqueCuisines);

				const uniqueDifficulties = Array.from(
					new Set(recipesData.recipes.map((r) => r.difficulty)),
				).sort();
				setDifficulties(uniqueDifficulties);

				setLoading(false);
			})
			.catch((error) => {
				console.error("Failed to fetch recipes:", error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		let filtered = [...allRecipes];

		if (searchTerm) {
			filtered = filtered.filter(
				(recipe) =>
					recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					recipe.tags.some((tag) =>
						tag.toLowerCase().includes(searchTerm.toLowerCase()),
					) ||
					recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		if (selectedCuisine !== "all") {
			filtered = filtered.filter(
				(recipe) => recipe.cuisine === selectedCuisine,
			);
		}

		if (selectedDifficulty !== "all") {
			filtered = filtered.filter(
				(recipe) => recipe.difficulty === selectedDifficulty,
			);
		}

		if (sortBy === "name-asc") {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortBy === "name-desc") {
			filtered.sort((a, b) => b.name.localeCompare(a.name));
		} else if (sortBy === "rating-desc") {
			filtered.sort((a, b) => b.rating - a.rating);
		} else if (sortBy === "rating-asc") {
			filtered.sort((a, b) => a.rating - b.rating);
		}

		setRecipes(filtered);
		setCurrentPage(1);
	}, [searchTerm, selectedCuisine, selectedDifficulty, sortBy, allRecipes]);

	const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
	const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
	const endIndex = startIndex + RECIPES_PER_PAGE;
	const currentRecipes = recipes.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">All Recipes</h1>
					<p className="text-gray-600">
						Explore our complete collection of delicious recipes
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<div className="flex items-center gap-2">
						<SlidersHorizontal className="h-5 w-5 text-gray-600" />
						<h2 className="text-lg font-semibold text-gray-900">
							Search & Filter
						</h2>
					</div>

					<div className="mb-6">
						<div className="flex gap-3 items-end">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Search recipes by name, cuisine, or tags..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Trier par
								</label>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
								>
									<option value="name-asc">Name A → Z</option>
									<option value="name-desc">Name Z → A</option>
									<option value="rating-desc">Best note</option>
									<option value="rating-asc">Worst note</option>
								</select>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Cuisine
							</label>
							<select
								value={selectedCuisine}
								onChange={(e) => setSelectedCuisine(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
							>
								<option value="all">All Cuisines</option>
								{cuisines.map((cuisine) => (
									<option key={cuisine} value={cuisine}>
										{cuisine}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Difficulty
							</label>
							<select
								value={selectedDifficulty}
								onChange={(e) => setSelectedDifficulty(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
							>
								<option value="all">All Levels</option>
								{difficulties.map((difficulty) => (
									<option key={difficulty} value={difficulty}>
										{difficulty}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="mt-4 pt-4 border-t border-gray-200">
						<p className="text-sm text-gray-600">
							Showing{" "}
							<span className="font-semibold text-gray-900">
								{recipes.length}
							</span>{" "}
							recipe{recipes.length !== 1 ? "s" : ""}
						</p>
					</div>
				</div>

				{loading ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, index) => (
							<CardSkeleton key={index} />
						))}
					</div>
				) : currentRecipes.length > 0 ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{currentRecipes.map((recipe) => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-xl text-gray-600">
							No recipe found matching your criteria.
						</p>
						<p className="text-gray-500 mt-2">
							Try adjusting your filters or search terms.
						</p>
					</div>
				)}

				{!loading && totalPages > 1 && (
					<div className="mt-12">
						<div className="flex items-center justify-center gap-2">
							<button
								onClick={goToPreviousPage}
								disabled={currentPage === 1}
								className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
									currentPage === 1
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md"
								}`}
							>
								<ChevronLeft className="h-5 w-5" />
								Previous
							</button>

							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, index) => {
									const page = index + 1;
									if (
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 1 && page <= currentPage + 1)
									) {
										return (
											<button
												key={page}
												onClick={() => goToPage(page)}
												className={`w-10 h-10 rounded-lg font-medium transition-colors ${
													currentPage === page
														? "bg-orange-600 text-white shadow-md"
														: "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md"
												}`}
											>
												{page}
											</button>
										);
									} else if (
										page === currentPage - 2 ||
										page === currentPage + 2
									) {
										return (
											<span key={page} className="px-2 text-gray-400">
												...
											</span>
										);
									}
									return null;
								})}
							</div>

							<button
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
								className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
									currentPage === totalPages
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md"
								}`}
							>
								Next
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>

						<div className="text-center mt-4">
							<p className="text-sm text-gray-600">
								Page{" "}
								<span className="font-semibold text-gray-900">
									{currentPage}
								</span>{" "}
								out of{" "}
								<span className="font-semibold text-gray-900">
									{totalPages}
								</span>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Recipes;
