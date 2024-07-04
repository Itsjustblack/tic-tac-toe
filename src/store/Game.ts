import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type IPlayer = "X" | "O" | "";

type GameStoreActions = {
	actions: {
		nextPlayer: () => void;
		updatePosition: (index: number) => void;
		updateScore: () => void;
		setwinningPattern: (pattern: Array<number> | null) => void;
		setWinner: (winner: IPlayer | null) => void;
		resetGame: () => void;
		nextGame: () => void;
	};
};

type GameStoreState = {
	scores: {
		X: number;
		O: number;
		tie: number;
	};
	currentPlayer: IPlayer;
	winner: IPlayer | null;
	boardPositions: Array<IPlayer>;
	winningPattern: Array<number> | null;
};

const initialState: GameStoreState = {
	scores: {
		X: 0,
		O: 0,
		tie: 0,
	},
	currentPlayer: "X",
	winner: null,
	boardPositions: ["", "", "", "", "", "", "", "", ""],
	winningPattern: null,
};

const useGameStore = create<GameStoreState & GameStoreActions>()(
	devtools((set) => ({
		...initialState,
		actions: {
			updatePosition: (index) =>
				set((state) => {
					if (state.boardPositions[index] || state.winner) return state;

					const newBoard = [...state.boardPositions];
					newBoard[index] = state.currentPlayer;

					return { boardPositions: newBoard };
				}),
			nextPlayer: () =>
				set((state) => ({
					currentPlayer: state.currentPlayer == "X" ? "O" : "X",
				})),
			setwinningPattern: (pattern) => set(() => ({ winningPattern: pattern })),
			updateScore: () =>
				set((state) => {
					if (state.winner !== null) {
						const key =
							state.winner === "X" || state.winner === "O"
								? state.winner
								: "tie";
						return {
							scores: { ...state.scores, [key]: state.scores[key] + 1 },
						};
					}
					return state;
				}),
			setWinner: (winner) => set(() => ({ winner })),
			resetGame: () => set(initialState),
			nextGame: () =>
				set((state) => ({
					...state,
					boardPositions: initialState.boardPositions,
					winner: null,
					currentPlayer: "X",
					winningPattern: null,
				})),
		},
	}))
);

export const useCurrentPlayer = () => useGameStore((s) => s.currentPlayer);
export const useScores = () => useGameStore((s) => s.scores);
export const useWinner = () => useGameStore((s) => s.winner);
export const useBoardPositions = () => useGameStore((s) => s.boardPositions);
export const useWinningPattern = () => useGameStore((s) => s.winningPattern);
export const useGameStoreActions = () => useGameStore((s) => s.actions);
