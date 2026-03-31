import type { Recipe } from "..";
import { ChefHat, Clock, Star, Users } from "lucide-react";
import { Link } from "react-router";

type Props = {
	recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
	return (
		<Link
			to={`/recipes/${recipe.id}`}
			className="group block bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300"
		>
			<div className="relative h-48 overflow-hidden">
				<img
					src={recipe.image}
					alt={recipe.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
					{recipe.cuisine}
				</div>
				<div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
					<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
					{recipe.rating.toFixed(1)}
				</div>
			</div>

			<div className="p-4">
				<h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
					{recipe.name}
				</h3>

				<div className="flex flex-wrap gap-1 mb-3">
					{recipe.tags.slice(0, 2).map((tag) => (
						<span
							key={tag}
							className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
						>
							{tag}
						</span>
					))}
				</div>

				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<Clock className="h-4 w-4" />
						<span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
					</div>
					<div className="flex items-center gap-1">
						<Users className="h-4 w-4" />
						<span>{recipe.servings} servings</span>
					</div>
					<div className="flex items-center gap-1">
						<ChefHat className="h-4 w-4" />
						<span>{recipe.difficulty}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
