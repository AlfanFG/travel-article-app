import API from "@/api/api";
import type { ICategory } from "@/feature/category/hooks";
import type { IComment } from "@/feature/comments/hooks";
import type { IUserProfile } from "@/stores/profileStore";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface IArticles {
	id: string;
	documentId: string;
	title: string;
	description: string;
	cover_image_url: string;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	publishedAt: Date | undefined;
	locale: string | undefined;
	user: IUserProfile;
	category: ICategory;
	comments: IComment;
	localizations: [];
}

const fetchArticlesById = async (id: string) => {
	try {
		const response: AxiosResponse<IPaginateResponseById<IArticles>> =
			await API.get(`/articles/${id}`);
		return { success: true, data: response.data.data };
	} catch (err: any) {
		const message =
			err.response?.data?.error?.message ||
			"Failed to fetch articles. Please try again.";
		return { success: false, error: message };
	}
};

export const useFetchArticleById = (id: string) => {
	return useQuery({
		queryKey: ["article", id],
		queryFn: () => fetchArticlesById(id),
		refetchOnWindowFocus: false,
		retry: 1,
		retryDelay: 1000,
		enabled: id !== "",
	});
};
