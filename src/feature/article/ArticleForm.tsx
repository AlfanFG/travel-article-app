import InputText from "@/components/input/input-text";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectCategory from "../category/SelectCategory";
import InputTextArea from "@/components/input/input-textarea";
import ImageUpload from "@/components/input/image-ipload";
import { DialogFooter } from "@/components/ui/dialog";
import { usePostArticles } from "./hooks/usePostArticles";
import Loading from "@/components/ui/loading";
import type { ArticlesProps } from "./hooks";
import { useFetchArticleById } from "./hooks/useFetchArticlesById";
import { usePutArticles } from "./hooks/usePutArticles";

export const articleSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }),
	description: z.string().min(1, { message: "Content is required!" }),
	category: z.string(),
	cover_image_url: z.string(),
});

interface IArticleForm {
	id: string;
}

export default function ArticleForm({ id }: IArticleForm) {
	const { data: article, isPending: IsPendingData } = useFetchArticleById(id);
	const { mutate, isPending } = usePostArticles();
	const { mutate: mutatePut, isPending: isUpdatePending } = usePutArticles();

	const { control, formState, handleSubmit, setValue, getValues, watch } =
		useForm({
			values: {
				title: article?.data?.title || "",
				description: article?.data?.description || "",
				category: String(article?.data?.category || ""), // Convert category to string
				cover_image_url: article?.data?.cover_image_url || "",
			},
			// resolver: zodResolver(articleSchema),
		});

	const { errors } = formState;
	const onSubmit = async (values: ArticlesProps) => {
		if (id) {
			mutatePut({ data: { ...values }, documentId: id });
		} else {
			mutate({
				data: {
					data: {
						...values,
						category: String(values.category), // Ensure category is a string
					},
				},
			});
		}
	};

	return IsPendingData && id ? (
		<Loading />
	) : (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-2 w-full"
		>
			<div className="flex flex-col gap-6 w-full px-6 pb-12 pt-4 relative">
				<InputText
					id="title"
					error={errors?.title?.message}
					name="title"
					label="Title"
					placeholder="Add article title"
					control={control}
					hook
				/>

				<SelectCategory
					onChange={(value) => setValue("category", value)}
					error={errors.category?.message}
					control={control}
					value={String(watch("category") && getValues("category"))}
				/>

				<InputTextArea
					id="description"
					error={errors?.description?.message}
					name="description"
					label="Description"
					placeholder="Add article description"
					control={control}
					hook
				/>

				<ImageUpload
					value={watch("cover_image_url") && getValues("cover_image_url")}
					onChange={(value) => setValue("cover_image_url", value)}
				/>
			</div>
			<DialogFooter className="absolute bottom-2 right-0 w-full px-12 bg-white p-4">
				<Button
					disabled={isPending && isUpdatePending}
					className="w-full"
					type="submit"
				>
					{isPending ? <Loading /> : <span>Submit</span>}
				</Button>
			</DialogFooter>
		</form>
	);
}
