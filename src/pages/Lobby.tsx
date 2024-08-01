import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { SocketContext } from "../components/SocketProvider";

const Lobby = () => {
	const navigate = useNavigate();
	const { socket } = useContext(SocketContext);
	const { room } = useParams();

	const exitGame = () => {
		setTimeout(() => {
			socket.emit("end_game", room);
		}, 1000);
	};

	useEffect(() => {
		socket.on("joined_room", () => {
			toast.success("Player Joined Room");
			navigate("/game");
		});
	}, []);

	if (!room)
		return (
			<Navigate
				to="/create"
				replace={true}
			/>
		);

	return (
		<Container className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-black">
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: "easeIn" }}
				className="max-w-[500px] w-full bg-white rounded-xl p-10"
			>
				<div className="flex gap-x-2 items-center">
					<h1 className="text-2xl font-bold sm:text-4xl">Game ID:</h1>
					<p className="font-medium text-2xl sm:text-4xl">{room}</p>
				</div>
				<div className="flex items-center gap-y-3 flex-col my-3">
					<p className="text-center text-xl font-semibold flex items-center gap-x-2">
						You are Player
						<span className="text-4xl font-bold">O</span>
					</p>
					<img
						className="h-full object-cover w-14"
						src="/assets/loader.svg"
					/>
					<p className="text-center text-lg font-medium">
						Waiting for Other Player
					</p>
				</div>
				<button
					type="button"
					onClick={exitGame}
					className="flex h-[47px] w-full items-center justify-center rounded-lg bg-black py-1 text-center text-lg font-semibold text-white"
				>
					Quit Game
				</button>
			</motion.section>
		</Container>
	);
};

export default Lobby;
