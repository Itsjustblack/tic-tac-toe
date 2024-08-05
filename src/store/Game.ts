import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type IPlayer = "X" | "O" | "";

type GameStoreActions = {
	actions: {
		onGameWon: (
			winner: IPlayer | null,
			pattern: Array<number> | null,
			scores: { X: number; O: number; Tie: number }
		) => void;
		resetGame: () => void;
		setRoom: (room: string) => void;
		setPlayer: (player: "X" | "O") => void;
		setPositions: (newPositions: Array<IPlayer>) => void;
		startNewRound: () => void;
	};
};

type GameStoreState = {
	scores: {
		X: number;
		O: number;
		Tie: number;
	};
	winner: IPlayer | null;
	winningPattern: Array<number> | null;
	room: string | null;
	player: "X" | "O";
	positions: Array<IPlayer> | null;
};

const initialState: GameStoreState = {
	scores: {
		X: 0,
		O: 0,
		Tie: 0,
	},
	winner: null,
	winningPattern: null,
	room: null,
	player: "X",
	positions: null,
};

const useGameStore = create<GameStoreState & GameStoreActions>()(
	devtools((set) => ({
		...initialState,
		actions: {
			resetGame: () => set(initialState),
			setPositions: (positions) => set({ positions }),
			setRoom: (room) => set({ room }),
			setPlayer: (player) => set({ player }),
			onGameWon: (winner, pattern, scores) =>
				set(() => ({ winner, scores, winningPattern: pattern })),
			startNewRound: () =>
				set({
					positions: Array(9).fill(""),
					winner: null,
					winningPattern: null,
				}),
		},
	}))
);

export const usePlayer = () => useGameStore((s) => s.player);
export const usePositions = () => useGameStore((s) => s.positions);
export const useRoom = () => useGameStore((s) => s.room);
export const useScores = () => useGameStore((s) => s.scores);
export const useWinner = () => useGameStore((s) => s.winner);
export const useWinningPattern = () => useGameStore((s) => s.winningPattern);
export const useGameStoreActions = () => useGameStore((s) => s.actions);
