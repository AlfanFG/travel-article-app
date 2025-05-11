import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"loading self-center my-4 loading-dots loading-xl",
				className
			)}
		></span>
	);
}
