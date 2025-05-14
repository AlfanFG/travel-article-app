import ButtonModal from "@/components/buttons/modal-button";
import InputText from "@/components/input/input-text";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useFetchCategory } from "./hooks/useFetchCategory";
import Loading from "@/components/ui/loading";

import TableCategory from "./TableCategory";
import { useGetPagination } from "@/stores/paginationStore";
import CategoryForm from "./CategoryForm";
import { useGetModal, useOpenModal } from "@/stores/modalStore";

export default function ListCategory() {
	const [search, setSearch] = useState<string | undefined>();
	const open = useGetModal();
	const setModal = useOpenModal();
	const [openModalCreate, setOpenModalCreate] = useState(false);
	const pagination = useGetPagination();

	const { data: categories, isPending } = useFetchCategory(
		pagination.pageIndex,
		pagination.pageSize,
		search
	);

	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
				<div className="flex flex-col xl:flex-row gap-4 w-full">
					<InputText
						label="Search name"
						name="search"
						className="w-72"
						id="search"
						debounced={500}
						onChange={(value) => setSearch(value || "")}
						value={search}
						placeholder="Search by name"
						searchIcon
					/>
				</div>
				<ButtonModal
					open={open}
					setIsOpen={setModal}
					title="Add Category"
					className="w-fit bg-secondary hover:bg-secondary/90"
					buttonLabel={
						<div className="flex items-center gap-2">
							<FaPlusCircle />
							<span>Add Category</span>
						</div>
					}
					content={<CategoryForm />}
				/>
			</div>
			{isPending && <Loading />}
			<div className="bg-white w-full rounded-md p-4">
				<TableCategory categories={categories?.data} />
			</div>
		</div>
	);
}
