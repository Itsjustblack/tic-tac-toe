import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Loader from "./pages/loader";

function App() {
	return (
		<main>
			<Routes>
				<Route
					path="/"
					element={<Loader />}
				/>
				<Route
					path="/game"
					element={<Game />}
				/>
			</Routes>
		</main>
	);
}

export default App;
