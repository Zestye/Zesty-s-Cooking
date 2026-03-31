import { useState } from "react";

const STORAGE_KEY = "zesty_favorites";

function loadFavorites(): number[] {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

export function useFavorites() {
	const [favorites, setFavorites] = useState<number[]>(loadFavorites);

	const toggleFavorite = (id: number) => {
		setFavorites((prev) => {
			const next = prev.includes(id)
				? prev.filter((f) => f !== id)
				: [...prev, id];
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			return next;
		});
	};

	const isFavorite = (id: number) => favorites.includes(id);

	return { favorites, toggleFavorite, isFavorite };
}
