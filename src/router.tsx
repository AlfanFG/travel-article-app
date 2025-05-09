import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Article from "./pages/article";

const route = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "article",
				element: <Article />,
			},
			{
				path: "category",
				element: <Article />,
			},
		],
	},
]);

export default route;
