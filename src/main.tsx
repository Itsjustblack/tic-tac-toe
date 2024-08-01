import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./components/SocketProvider/index.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<SocketProvider>
				<App />
				<Toaster />
			</SocketProvider>
		</BrowserRouter>
	</React.StrictMode>
);
