import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../store/Modal";
import Container from "../Container";

interface ModalContainerProps {
	children: React.ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({ children }) => {
	const { isOpen } = useModal();
	return (
		<>
			{createPortal(
				<AnimatePresence mode="popLayout">
					{isOpen ? (
						<motion.section
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="pointer-events-auto fixed bottom-0 top-0 z-50 w-full bg-black"
						>
							<Container className="overflow-hidden flex flex-col justify-center items-center h-screen">
								{children}
							</Container>
						</motion.section>
					) : null}
				</AnimatePresence>,
				document.body
			)}
		</>
	);
};

export default ModalContainer;
