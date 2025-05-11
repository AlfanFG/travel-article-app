import ListCategory from "@/feature/category/ListCategory";

export default function Category() {
	return (
		<div className="h-full w-full p-4 rounded-md">
			<p className="text-2xl font-bold ml-6">Category</p>
			<ListCategory />
		</div>
	);
}
