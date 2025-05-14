import { useEffect, useState } from "react";

import { useFetchCategory } from "./hooks/useFetchCategory";

import TableCategory from "./TableCategory";
import { useGetPagination } from "@/stores/paginationStore";

import ButtonAdd from "@/components/buttons/ButtonAdd";
import useModalForm from "@/hooks/useModalForm";
import CategoryForm from "./CategoryForm";
import FilterData, { type listFilter } from "@/components/filter-data";
import { useSetLoading } from "@/stores/loadingStore";

export default function ListCategory() {
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
  const { data: categories, isPending } = useFetchCategory(
    pagination.pageIndex,
    pagination.pageSize,
    search
  );

  useEffect(() => {
    if (isPending) loading(true);
    if (!isPending) loading(false);
  }, [isPending]);

  const { createModalForm, showModal, hideModal } =
    useModalForm("Add Category");

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-6">
      <div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
        <div className="flex flex-col xl:flex-row gap-4 w-full">
          <FilterData listFilter={listFilter} />
        </div>
        <ButtonAdd
          text="Add Category"
          click={showModal}
          className="flex items-center gap-2 w-full sm:w-fit"
        />
      </div>

      <div className="bg-white w-full rounded-md p-4">
        <TableCategory
          categories={categories?.data ?? []}
          meta={
            categories?.meta ?? {
              pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 },
            }
          }
        />
      </div>
      {createModalForm(<CategoryForm hideModal={hideModal} />)}
    </div>
  );
}
