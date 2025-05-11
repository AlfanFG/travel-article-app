import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "@/api/api";
import type { PostArticlesProps } from ".";
import { useOpenModal } from "@/stores/modalStore";

const postArticles = async ({ data }: { data: PostArticlesProps }) => {
	return await API.post("/articles", data);
};

export const usePostArticles = () => {
	const openModal = useOpenModal();
	const queryCLient = useQueryClient();

	return useMutation({
		mutationFn: postArticles,
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: ["articles"],
			});

			toast.success(`Articles has been added successfully!`);
		},
		onError: (
			error: AxiosError<{
				error: {
					details?: { errors?: { message: string }[] };
					message: string;
				};
			}>
		) => {
			const errorMessage =
				error.response?.data?.error?.details?.errors?.map((item) => (
					<li key={item.message}>{item.message}</li>
				)) || error.response?.data?.error?.message;
			toast.error(<ul>{errorMessage}</ul>);
		},
		onSettled: () => {
			openModal(false);
		},
	});
};
