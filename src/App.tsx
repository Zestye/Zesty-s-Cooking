import { BrowserRouter, Route, Routes } from "react-router";
import Recipes from "./pages/Recipes";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<div>Hello World!</div>} />
				<Route path="/categories" element={<div>Hello World!</div>} />
				<Route path="/favorites" element={<div>Hello World!</div>} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/recipe/:id" element={<div>Hello World!</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
