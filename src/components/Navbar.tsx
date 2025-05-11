import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs";
import Dropdown from "./dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Navbar() {
	const navigate = useNavigate();
	return (
		<div className="w-full bg-white border-b-2 h-16 px-10 flex justify-between items-center">
			<Breadcrumbs />
			<Dropdown
				button={
					<Button variant={"ghost"} className="flex gap-2 py-6 items-center">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span>Alfan</span>
					</Button>
				}
				className="mr-12"
				label="Menu"
				items={[
					{
						label: "Profile",
						onClick: () => navigate("/profile"),
					},
					{
						label: "Log Out",
						onClick: () => {
							localStorage.clear();
							navigate("/login");
						},
					},
				]}
			/>
		</div>
	);
}
