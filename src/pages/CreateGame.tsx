/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { SocketContext } from "../components/SocketProvider";
import { useGameStoreActions } from "../store/Game";

const CreateGame = () => {
	const navigate = useNavigate();
	const { socket } = useContext(SocketContext);
	const roomRef = useRef<HTMLInputElement>(null);
	const { setPlayer, setRoom, setPositions } = useGameStoreActions();

	const createGame = () => socket.emit("create_room");

	const handleSubmit = () => {
		if (roomRef.current?.value) {
			setPlayer("O");
			setRoom(roomRef.current?.value);
			socket.emit("join_room", roomRef.current?.value);
		} else toast.error("Room cannot be empty");
	};

	useEffect(() => {
		socket.on("room_created", (room) => {
			setRoom(room);
			navigate(`/lobby/${room}`);
		});

		socket.on("new_game", (positions): void => {
			toast.dismiss();
			toast.success("Player Joined Room");
			setPositions(positions);
			navigate("/game");
		});
	}, []);

	return (
		<Container className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-black">
			<section className="max-w-[500px] w-full bg-white rounded-xl p-8 sm:p-10">
				<h1 className="text-2xl font-bold sm:text-4xl">
					Create or Join a Game
				</h1>
				<form className="mt-3">
					<label
						htmlFor="email"
						className="block font-medium tracking-[-0.15px] text-[#718096]"
					>
						Lobby
					</label>
					<input
						ref={roomRef}
						required
						type="text"
						className="mt-2 h-10 w-full rounded-lg border border-[#CBD5E0] px-3 text-sm text-black transition-colors duration-200 ease-in focus:border-black"
						placeholder="Enter your Lobby ID"
					/>
					<button
						type="button"
						onClick={handleSubmit}
						className="mt-6 flex h-[47px] w-full items-center justify-center rounded-lg bg-black py-1 text-center text-lg font-semibold text-white"
					>
						Join Game
					</button>
				</form>
				<div className="flex w-full justify-center gap-x-2 my-4 items-center">
					<div className="w-full h-[1.3px] bg-black rounded-3xl" />
					<p className="text-lg font-semibold">OR</p>
					<div className="w-full h-[1.3px] bg-black rounded-3xl" />
				</div>
				<button
					type="button"
					onClick={createGame}
					className="flex h-[47px] w-full items-center justify-center rounded-lg bg-black py-1 text-center text-lg font-semibold text-white"
				>
					New Game
				</button>
			</section>
		</Container>
	);
};

export default CreateGame;
