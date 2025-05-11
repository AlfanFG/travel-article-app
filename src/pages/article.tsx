import ListArticle from "@/feature/article/ListArticle";
export default function Article() {
	return (
		<div className="h-full w-full p-4 rounded-md">
			<p className="text-2xl font-bold ml-6">Article</p>
			<ListArticle />
		</div>
	);
}
