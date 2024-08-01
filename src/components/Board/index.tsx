import { FC } from "react";
import { IPlayer } from "../../store/Game";
import { Tile } from "../Tile";

interface BoardProps {
	positions: IPlayer[];
}

const Board: FC<BoardProps> = ({ positions }) => {
	return (
		<div className="grid grid-cols-3 grid-rows-3">
			{positions.map((_, i) => (
				<Tile
					key={i}
					move={positions[i]}
					position={i}
				/>
			))}
		</div>
	);
};

export default Board;
