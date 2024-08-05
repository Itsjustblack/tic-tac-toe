import { Route, Routes } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import Loader from "./pages/loader";
import NewRoundModal from "./components/NewRoundModal";

function App() {
	return (
		<main>
			<Routes>
				<Route
					path="/"
					element={<Loader />}
				/>
				<Route
					path="/create"
					element={<CreateGame />}
				/>
				<Route
					path="/lobby/:room"
					element={<Lobby />}
				/>
				<Route
					path="/game"
					element={<Game />}
				/>
			</Routes>
			<NewRoundModal />
		</main>
	);
}

export default App;
