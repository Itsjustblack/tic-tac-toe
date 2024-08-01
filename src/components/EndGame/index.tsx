import { useModal } from "../../store/Modal";

const EndGame = () => {
	const { toggleModal } = useModal();
	return (
		<button
			type="button"
			onClick={() => toggleModal(true)}
			className="text-black text-nowrap font-semibold bg-white rounded-xl px-3 h-[50px] absolute right-0"
		>
			End Game
		</button>
	);
};

export default EndGame;
