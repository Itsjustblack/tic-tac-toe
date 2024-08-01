import { create } from "zustand";

interface ModalStoreType {
	isOpen: boolean;
	toggleModal: (isOpen: boolean) => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
	isOpen: false,
	toggleModal: (isOpen) => set(() => ({ isOpen })),
}));

export const useModal = () => {
	const isOpen = useModalStore((s) => s.isOpen);
	const toggleModal = useModalStore((s) => s.toggleModal);
	return { isOpen, toggleModal };
};
