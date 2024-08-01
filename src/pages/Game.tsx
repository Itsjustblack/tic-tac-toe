/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Board from "../components/Board";
import Container from "../components/Container";
import EndGame from "../components/EndGame";
import Scores from "../components/Scores";
import { SocketContext } from "../components/SocketProvider";
import { IPlayer, useGameStoreActions, usePositions } from "../store/Game";

const Game = () => {
	const { socket } = useContext(SocketContext);

	const positions = usePositions();

	const { setPositions, onGameWon, startNewRound } = useGameStoreActions();

	useEffect(() => {
		socket.on("update_board", (positions: IPlayer[]) => {
			setPositions(positions);
		});

		socket.on("game_won", (winner: IPlayer, pattern, scores) => {
			onGameWon(winner, pattern, scores);
		});

		socket.on("new_round", (round) => {
			startNewRound();
			toast.success(`Round ${round}`);
		});
	}, []);

	if (!positions)
		return (
			<Navigate
				to="/create"
				replace={true}
			/>
		);

	return (
		<Container className="relative h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-black">
			<Board positions={positions} />
			<div className="flex w-full items-center mt-5 relative">
				<Scores />
				<EndGame />
			</div>
		</Container>
	);
};

export default Game;
