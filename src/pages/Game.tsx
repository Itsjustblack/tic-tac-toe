import Board from "../components/Board";
import Container from "../components/Container";
import { useScores } from "../store/Game";

const Game = () => {
	const { X, O, tie } = useScores();

	return (
		<Container className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-black">
			<Board />
			<div className="flex text-white mt-5 justify-center gap-x-12 md:gap-x-20 items-center w-full text-center">
				<div>
					<p className="text-base">Player1 (X)</p>
					<span className="text-3xl">{X}</span>
				</div>
				<div>
					<p className="text-base">Tie</p>
					<span className="text-3xl">{tie}</span>
				</div>
				<div>
					<p className="text-base">Player2 (O)</p>
					<span className="text-3xl">{O}</span>
				</div>
			</div>
		</Container>
	);
};

export default Game;
