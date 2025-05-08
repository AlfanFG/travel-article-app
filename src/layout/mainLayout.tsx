import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function MainLayout() {
	return (
		<Sidebar>
			<Outlet />
		</Sidebar>
	);
}
