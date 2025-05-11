import { type ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useGetModal, useOpenModal } from "@/stores/modalStore";

interface ButtonAddProps {
	title: string | ReactNode;
	description?: string | ReactNode;
	buttonLabel: string | ReactNode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	content: ReactNode;
}

export default function ButtonModal({
	buttonLabel,
	className,
	title,
	disabled,
	description,
	content,
}: ButtonAddProps) {
	const open = useGetModal();
	const setOpen = useOpenModal();
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={() => setOpen(true)}
					className={cn(className)}
					disabled={disabled}
				>
					{buttonLabel}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] bg-white">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="overflow-auto max-h-[50rem] pb-6">{content}</div>
			</DialogContent>
		</Dialog>
	);
}
