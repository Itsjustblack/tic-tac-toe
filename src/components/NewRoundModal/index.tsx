import ModalContainer from "../ModalContainer";

const NewRoundModal = () => {
	return (
		<ModalContainer>
			<section className="max-w-[450px] aspect-video w-full bg-white rounded-xl p-10 text-center">
				<h1 className="text-3xl font-bold sm:text-4xl mb-10">Player X Won</h1>
				<div className="flex gap-x-5">
					<button
						type="button"
						// onClick={createGame}
						className="flex h-[47px] w-full items-center justify-center rounded-lg bg-black py-1 text-center text-lg font-semibold text-white"
					>
						End Game
					</button>
					<button
						type="button"
						// onClick={createGame}
						className="flex h-[47px] w-full items-center justify-center rounded-lg bg-black py-1 text-center text-lg font-semibold text-white"
					>
						Next Round
					</button>
				</div>
			</section>
		</ModalContainer>
	);
};

export default NewRoundModal;
