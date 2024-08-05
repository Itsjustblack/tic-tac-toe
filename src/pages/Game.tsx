/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Container from "../components/Container";
import Scores from "../components/Scores";
import { SocketContext } from "../components/SocketProvider";
import { IPlayer, useGameStoreActions, usePositions } from "../store/Game";
import { useModal } from "../store/Modal";

const Game = () => {
	const { socket } = useContext(SocketContext);
	const navigate = useNavigate();

	const positions = usePositions();

	const { setPositions, onGameWon, startNewRound, resetGame } =
		useGameStoreActions();
	const { toggleModal } = useModal();

	useEffect(() => {
		socket.on("update_board", (positions: IPlayer[]) => {
			setPositions(positions);
		});

		socket.on("game_won", (winner: IPlayer, pattern, scores) => {
			onGameWon(winner, pattern, scores);
			setTimeout(() => {
				toggleModal(true);
			}, 1000);
		});

		socket.on("new_round", (round) => {
			startNewRound();
			toggleModal(false);
			toast.dismiss();
			toast.success(`Round ${round}`);
		});

		socket.on("game_over", () => {
			toggleModal(false);
			resetGame();
			navigate("/create");
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
			<Scores />
		</Container>
	);
};

export default Game;
