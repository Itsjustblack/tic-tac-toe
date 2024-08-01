import { useContext } from "react";
import { SocketContext } from "../SocketProvider";
import { useNavigate } from "react-router-dom";

const EndGame = () => {
	const { socket } = useContext(SocketContext);

	const navigate = useNavigate();

	const exitGame = () => {
		socket.emit("end_game");
		navigate("/create");
	};
	return (
		<button
			type="button"
			onClick={exitGame}
			className="text-black text-nowrap font-semibold bg-white rounded-xl px-3 h-[50px] absolute right-0 bottom-0"
		>
			End Game
		</button>
	);
};

export default EndGame;
