/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { useRoom, useWinner } from "../../store/Game";
import { useModal } from "../../store/Modal";
import ModalContainer from "../ModalContainer";
import { SocketContext } from "../SocketProvider";

const NewRoundModal = () => {
	const { socket } = useContext(SocketContext);
	const room = useRoom();
	const winner = useWinner();

	const { toggleModal } = useModal();

	const nextRound = () => {
		socket.emit("next_round", room);
		toggleModal(false);
	};

	const exitGame = () => {
		socket.emit("end_game", room);
		toggleModal(false);
	};

	return (
		<ModalContainer>
			<section className="max-w-[500px] h-fit w-full border border-white rounded-xl py-7 sm:py-8 px-6 sm:px-10 text-center">
				<h1 className="font-semibold text-3xl sm:text-4xl mb-7 font-poppins text-white">
					{`Player ${winner} Won`}
				</h1>
				<div className="flex gap-x-4 justify-around">
					<button
						type="button"
						onClick={nextRound}
						className="flex w-full max-w-[130px] px-2 text-sm items-center justify-center rounded-2xl bg-white py-2 text-center sm:text-lg font-semibold"
					>
						Next Round
					</button>
					<button
						type="button"
						onClick={exitGame}
						className="flex w-full max-w-[130px] px-2 text-sm items-center justify-center rounded-2xl bg-black py-2 text-center sm:text-lg text-white border border-white hover:bg-white hover:text-black transition-colors duration-200 font-semibold"
					>
						End Game
					</button>
				</div>
			</section>
		</ModalContainer>
	);
};

export default NewRoundModal;
