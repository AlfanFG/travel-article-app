import ButtonModal from "@/components/buttons/modal-button";
import InputText from "@/components/input/input-text";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useFetchCategory } from "./hooks/useFetchCategory";
import Loading from "@/components/ui/loading";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { TableData } from "@/components/table";

export default function ListCategory() {
	const [search, setSearch] = useState<string | undefined>();
	const [page, setPage] = useState(1);

	const { data: categories, isPending } = useFetchCategory(page, 10, search);

	const tableHeader = ["Name", "Description", "Created At"];
	const tableBody = categories?.data?.data?.map((item) => (
		<TableRow>
			<TableCell className="font-medium">{item.name}</TableCell>
			<TableCell className="font-medium">{item.description ?? "-"}</TableCell>
			<TableCell className="font-medium">
				{formatDate(item.createdAt)}
			</TableCell>
		</TableRow>
	));
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
					title="Add Article"
					className="w-fit bg-secondary hover:bg-secondary/90"
					buttonLabel={
						<div className="flex items-center gap-2">
							<FaPlusCircle />
							<span>Add Category</span>
						</div>
					}
					content={<></>}
				/>
			</div>
			{isPending && <Loading />}
			<div className="bg-white w-full rounded-md p-4">
				<TableData
					tableBody={tableBody || []}
					tableHeader={tableHeader}
					pagination={categories?.data?.meta}
					setPage={setPage}
				/>
			</div>
		</div>
	);
}
