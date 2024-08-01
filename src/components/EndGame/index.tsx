import { useContext } from "react";
import { useRoom } from "../../store/Game";
import { SocketContext } from "../SocketProvider";

const EndGame = () => {
	const { socket } = useContext(SocketContext);
	const room = useRoom();

	const exitGame = () => {
		setTimeout(() => {
			socket.emit("end_game", room);
		}, 1000);
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
