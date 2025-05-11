import InputText from "@/components/input/input-text";
import { useFetchArticles } from "./hooks/useFetchArticles";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import InputSelect from "@/components/input/input-select";
import CardInfo from "@/components/card-info";
import { useFetchCategory } from "../category/hooks/useFetchCategory";
import ImageNotFound from "@/assets/image-notfound.png";
import Loading from "@/components/ui/loading";
import NotFound from "@/components/not-found";
import Paginate from "@/components/paginate";

import ButtonModal from "@/components/buttons/modal-button";
import ArticleForm from "./ArticleForm";
import { useGetModal, useOpenModal } from "@/stores/modalStore";
import { useDeleteArticles } from "./hooks/useDeleteArticles";
import { ButtonConfirmation } from "@/components/buttons/confirmation-button";

export default function ListArticle() {
	const [search, setSearch] = useState<string | undefined>();
	const [page, setPage] = useState(1);
	const [category, setCategory] = useState<string | undefined>();
	const [articleId, setArticleId] = useState("");
	const { data: articles, isPending: isLoadArticle } = useFetchArticles(
		page,
		12,
		search,
		category
	);
	const openModal = useOpenModal();
	const isOpenModal = useGetModal();
	const { data: categories } = useFetchCategory();
	const { mutate: mutateDelete, isPending: isPendingDelete } =
		useDeleteArticles();

	useEffect(() => {
		if (!isOpenModal) setArticleId("");
	}, [isOpenModal]);

	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
				<div className="flex flex-col xl:flex-row gap-4 w-full">
					<InputSelect
						className="w-72"
						id="category"
						placeholder="Choose article category"
						option={categories?.data?.data?.map((category) => {
							return {
								value: category.name,
								label: category.name,
							};
						})}
						name="category"
						label="Category"
						onChange={(value) => setCategory(value)}
					/>

					<InputText
						label="Search article"
						name="search"
						className="w-72"
						id="search"
						debounced={500}
						onChange={(value) => setSearch(value || "")}
						value={search}
						placeholder="Search by title"
						searchIcon
					/>
				</div>
				<ButtonModal
					title="Add Article"
					className="w-fit bg-secondary hover:bg-secondary/90"
					buttonLabel={
						<div className="flex items-center gap-2">
							<FaPlusCircle />
							<span>Add Article</span>
						</div>
					}
					content={<ArticleForm id={articleId} />}
				/>
			</div>
			{(isLoadArticle || isPendingDelete) && <Loading />}

			{!articles?.data?.data?.length && !isLoadArticle && (
				<div className="bg-white w-full h-full p-6">
					<NotFound />
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 gap-4">
				{articles?.data?.data?.map((article) => (
					<CardInfo
						key={article.id}
						title={article.title}
						imgCover={
							<>
								<img
									src={article.cover_image_url || ImageNotFound}
									alt={article.title}
									className="w-full h-48 object-cover rounded-md"
								/>
								<div className="absolute top-0 left-0 w-full pt-2 pr-2 gap-2  flex justify-end">
									<Button
										className="bg-secondary hover:bg-secondary/80"
										title="Edit"
										onClick={() => {
											setArticleId(article.documentId);
											openModal(true);
										}}
									>
										<FaEdit></FaEdit>
									</Button>
									<ButtonConfirmation
										description="This action cannot be undone. This will  delete your data!"
										confirm={() =>
											mutateDelete({ documentId: article.documentId })
										}
										button={
											<Button className="bg-red-700 hover:bg-red-700">
												<FaTrash />
											</Button>
										}
									/>
								</div>
							</>
						}
					>
						<p className="line-clamp-3">{article.description}</p>
					</CardInfo>
				))}
			</div>
			{!isLoadArticle && (
				<Paginate
					totalItems={articles?.data?.meta?.pagination?.total ?? 1}
					itemsPerPage={articles?.data?.meta?.pagination?.pageSize ?? 10}
					currentPage={page}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
