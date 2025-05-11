import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ReactNode } from "react";
import Paginate from "./paginate";

interface ITable {
	tableBody: ReactNode[];
	tableHeader: Array<string>;
	pagination: IPaginationMeta | any;
	setPage: any;
}

export function TableData({
	tableBody,
	tableHeader,
	pagination,
	setPage,
}: ITable) {
	return (
		<div className="flex flex-col gap-4">
			<Table>
				<TableHeader>
					<TableRow>
						{tableHeader?.map((item: string) => (
							<TableCell key={item}>{item}</TableCell>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>{tableBody}</TableBody>
			</Table>
			<Paginate
				currentPage={pagination?.page}
				itemsPerPage={pagination?.pageCount}
				totalItems={pagination?.total}
				onPageChange={setPage}
			/>
		</div>
	);
}
