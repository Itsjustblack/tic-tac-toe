/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Socket, io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

interface ISocketContext {
	socket: Socket;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

const socket = io(URL);

const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
	useEffect(() => {
		socket.on("connect", () => {
			console.log("User Connected");
		});

		socket.on("disconnect", () => {
			console.log("User Disconnected");
		});

		socket.on("exception", (error) => {
			console.log(error);
			toast.error(error?.message);
		});

		return () => {
			socket.off("connect", () => {
				console.log("User Connected");
			});

			socket.off("disconnect", () => {
				console.log("User Disconnected");
			});
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
