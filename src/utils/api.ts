import axios from "axios";
import type { Recipe, RecipesResponse } from "..";

export const api = axios.create({
	baseURL: "https://dummyjson.com/",
});

export const fetchAllRecipes = async (): Promise<RecipesResponse> => {
	const response = await api.get<RecipesResponse>("/recipes", {
		params: { limit: 0 },
	});
	return response.data;
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
	const response = await api.get<Recipe>(`/recipes/${id}`);
	return response.data;
};

export const searchRecipes = async (
	query: string,
): Promise<RecipesResponse> => {
	const response = await api.get<RecipesResponse>("/recipes/search", {
		params: { q: query },
	});
	return response.data;
};

export const fetchRecipesByTag = async (
	tag: string,
): Promise<RecipesResponse> => {
	const response = await api.get<RecipesResponse>(`/recipes/tag/${tag}`);
	return response.data;
};

export const fetchRecipeTags = async (): Promise<string[]> => {
	const response = await api.get<{ tags: string[] }>("/recipes/tags");
	return response.data.tags;
};
