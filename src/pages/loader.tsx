import { cubicBezier, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loader = () => {
	const navigate = useNavigate();
	const [scope, animate] = useAnimate();
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		const controls = animate(0, 100, {
			duration: 3,
			ease: cubicBezier(0, 0.7, 0.99, 0.34),
			onUpdate: (latest) => setPercentage(Math.floor(latest)),
			onComplete: () => setTimeout(() => navigate("/game"), 1500),
		});

		return () => controls.stop();
	}, [animate, navigate]);

	return (
		<section className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-black">
			<h1 className="text-white text-5xl text-center mb-6 font-semibold">
				Tic Tac Toe
			</h1>
			<span
				ref={scope}
				className="text-white text-2xl font-semibold font-mochiy"
			>
				{`${percentage}%`}
			</span>
		</section>
	);
};

export default Loader;
