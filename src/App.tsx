import { BrowserRouter, Route, Routes } from "react-router";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main className="pt-20">
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="/categories" element={<div>Hello World!</div>} />
				<Route path="/favorites" element={<div>Hello World!</div>} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipe/:id" element={<RecipeDetail />} />
			</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
