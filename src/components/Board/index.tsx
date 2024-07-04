import { useEffect } from "react";
import { useBoardPositions, useGameStoreActions } from "../../store/Game";
import { getWinningPositions } from "../../utils/helper";
import { Tile } from "../Tile";

const Board = () => {
	const boardPositions = useBoardPositions();
	const { setWinner, setwinningPattern, updateScore, nextGame } =
		useGameStoreActions();

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		const { winner, winningPattern } = getWinningPositions(boardPositions);
		setWinner(winner);
		setwinningPattern(winningPattern);

		if (winner) {
			updateScore();
			timeout = setTimeout(() => {
				nextGame();
			}, 2000);
		}

		return () => clearTimeout(timeout);
	}, [boardPositions, nextGame, setWinner, setwinningPattern, updateScore]);

	return (
		<div className="grid grid-cols-3 grid-rows-3">
			{boardPositions.map((_, i) => (
				<Tile
					key={i}
					move={boardPositions[i]}
					position={i}
				/>
			))}
		</div>
	);
};

export default Board;
