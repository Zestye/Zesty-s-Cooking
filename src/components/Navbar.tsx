import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<header className="border-b fixed top-0 left-0 w-full z-10 bg-white">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<NavLink to="/" className="flex items-center gap-3">
					<img
						src="Zesty's Cooking.png"
						alt="Logo Zesty's Cooking"
						className="h-12 w-12 object-contain"
					/>
					<h1 className="text-2xl font-bold text-mirage">
						Zesty&apos;s Cooking
					</h1>
				</NavLink>
				<nav className="hidden gap-8 md:flex">
					<NavLink
						to="/"
						className="text-sm font-medium text-slate-700 hover:text-black"
					>
						Accueil
					</NavLink>
					<NavLink
						to="/recipes"
						className="text-sm font-medium text-slate-700 hover:text-black"
					>
						Recettes
					</NavLink>
					<NavLink
						to="/favorites"
						className="text-sm font-medium text-slate-700 hover:text-black"
					>
						Favoris
					</NavLink>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
