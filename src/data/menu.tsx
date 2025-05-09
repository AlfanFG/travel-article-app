import type { ReactNode } from "react";
import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

interface IMenu {
	name: string;
	label: string;
	link: string;
	icon: string | IconType;
}

const menu: IMenu[] = [
	{
		name: "home",
		link: "/",
		label: "Home",
		icon: FaHome,
	},
	{
		name: "article",
		link: "/article",
		label: "Article",
		icon: MdArticle,
	},
	{
		name: "category",
		link: "/category",
		label: "Category",
		icon: BiSolidCategory,
	},
];

export default menu;
