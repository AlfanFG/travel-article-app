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

const fetchArticles = async (
	page: number,
	limit: number,
	title?: string,
	category?: string
) => {
	try {
		const response: AxiosResponse<IPaginateResponse<IArticles>> = await API.get(
			"/articles",
			{
				params: {
					"pagination[page]": page,
					"pagination[pageSize]": limit,
					"filters[title][$containsi]": title,
					"filters[category][name][$containsi]": category,
				},
			}
		);
		return { success: true, data: response.data };
	} catch (err: any) {
		const message =
			err.response?.data?.error?.message ||
			"Failed to fetch articles. Please try again.";
		return { success: false, error: message };
	}
};

export const useFetchArticles = (
	page: number,
	limit: number,
	title?: string,
	category?: string
) => {
	return useQuery({
		queryKey: ["articles", page, limit, title, category],
		queryFn: () => fetchArticles(page, limit, title, category),
		refetchOnWindowFocus: false,
		retry: 1,
		retryDelay: 1000,
	});
};
