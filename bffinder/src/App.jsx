import React from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "containers/Layout";
import Login from "containers/Login";
import RecoveryPassword from "containers/RecoveryPassword";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Perfil from "pages/Perfil";
import PublicRouter from "./routes/PublicRouter";

const App = () => {
  return (
	<BrowserRouter>
		<Layout>
			<PublicRouter />
		</Layout>
	</BrowserRouter>
  );
}; 

export default App;