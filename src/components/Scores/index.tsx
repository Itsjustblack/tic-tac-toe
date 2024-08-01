import { useScores } from "../../store/Game";

const Scores = () => {
	const { X, O, Tie } = useScores();
	return (
		<div className="flex text-white justify-center gap-x-12 md:gap-x-20 items-center w-full text-center">
			<div>
				<p className="text-base">Me (X)</p>
				<span className="text-3xl">{X}</span>
			</div>
			<div>
				<p className="text-base">Tie</p>
				<span className="text-3xl">{Tie}</span>
			</div>
			<div>
				<p className="text-base">Other (O)</p>
				<span className="text-3xl">{O}</span>
			</div>
		</div>
	);
};

export default Scores;
