import React, { useEffect, useState } from "react";
import "styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Views/containers/Layout";
import Router from "./routes/Router";

const App = () => {
	return <BrowserRouter>
		<Layout>
			<Router />
		</Layout>
	</BrowserRouter>
};

export default App;