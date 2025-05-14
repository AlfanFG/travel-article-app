import { useEffect, useState } from "react";

import { useGetPagination } from "@/stores/paginationStore";

import FilterData, { type listFilter } from "@/components/filter-data";
import { useSetLoading } from "@/stores/loadingStore";
import { useFetchComments } from "./hooks/useFetchComments";
import CommentTable from "./CommentTable";

export default function ListComments() {
  const [search, setSearch] = useState<string | undefined>();
  const loading = useSetLoading();

  const pagination = useGetPagination();
  const listFilter: listFilter = [
    {
      label: "Search Category",
      name: "category",
      placeholder: "Search by name",
      type: "text",
      setFilter: setSearch,
    },
  ];
  const { data: comments, isPending } = useFetchComments({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    content: search,
  });

  useEffect(() => {
    if (isPending) loading(true);
    if (!isPending) loading(false);
  }, [isPending]);

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-6">
      <div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
        <div className="flex flex-col xl:flex-row gap-4 w-full">
          <FilterData listFilter={listFilter} />
        </div>
      </div>

      <div className="bg-white w-full rounded-md p-4">
        {JSON.stringify(comments?.data)}
        <CommentTable
          comments={comments?.data ?? []}
          meta={
            comments?.meta ?? {
              pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
            }
          }
        />
      </div>
    </div>
  );
}
