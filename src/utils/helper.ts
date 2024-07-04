import { IPlayer } from "../store/Game";

const winningPatterns = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export function getWinningPositions(positions: Array<IPlayer>): {
	winner: IPlayer | null;
	winningPattern: number[] | null;
} {
	let winner = null;
	let winningPattern = null;
	winningPatterns.forEach((pattern) => {
		if (
			positions[pattern[0]] &&
			positions[pattern[0]] === positions[pattern[1]] &&
			positions[pattern[0]] === positions[pattern[2]]
		) {
			winner = positions[pattern[0]];
			winningPattern = pattern;
		}
	});

	if (positions.every((position) => position)) {
		return { winner: "", winningPattern: null }; // Tie
	}

	return { winner, winningPattern };
}
