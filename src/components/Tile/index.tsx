import classNames from "classnames";
import { FC, useContext } from "react";
import {
	usePlayer,
	useRoom,
	useWinner,
	useWinningPattern,
} from "../../store/Game";
import { SocketContext } from "../SocketProvider";

interface TileProps {
	position: number;
	move: string;
}

export const Tile: FC<TileProps> = ({ move, position }) => {
	const { socket } = useContext(SocketContext);
	const player = usePlayer();
	const pattern = useWinningPattern();
	const room = useRoom();
	const winner = useWinner();

	const makeMove = () => {
		socket.emit("player_moved", { room, position, player });
	};

	return (
		<button
			onClick={makeMove}
			className={classNames(
				"w-[100px] sm:w-[120px] aspect-square relative flex justify-center items-center",
				{
					"border-l border-r": position == 1 || position == 4 || position == 7,
					"border-b": position == 0 || position == 1 || position == 2,
					"border-t": position == 6 || position == 7 || position == 8,
					"border-flash": winner == "",
				}
			)}
		>
			{move === "X" || move === "O" ? (
				<img
					className={classNames("object-cover w-[85%]", {
						flash: pattern && pattern.some((pos) => position == pos),
					})}
					src={`/assets/player${move}.svg`}
					alt=""
				/>
			) : null}
		</button>
	);
};
