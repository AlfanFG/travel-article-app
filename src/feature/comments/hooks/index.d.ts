export interface IComment {
	id: string;
	documentId: string;
	content: string;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	publishedAt: Date | undefined;
	locale: string | undefined;
}
