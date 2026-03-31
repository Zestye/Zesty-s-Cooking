import { BrowserRouter, Route, Routes } from "react-router";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<div>Hello World!</div>} />
				<Route path="/categories" element={<div>Hello World!</div>} />
				<Route path="/favorites" element={<div>Hello World!</div>} />
				<Route path="/recipes" element={<div>Hello World!</div>} />
				<Route path="/recipe/:id" element={<div>Hello World!</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
