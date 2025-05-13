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
import {
  useGetModal,
  useGetModalName,
  useOpenModal,
  useSetModalName,
} from "@/stores/modalStore";

interface ButtonAddProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  buttonLabel: string | ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  content: ReactNode;
  name: string;
}

export default function ButtonModal({
  name,
  buttonLabel,
  className,
  title,
  disabled,
  description,
  content,
}: ButtonAddProps) {
  const open = useGetModal();
  const modalStoreName = useGetModalName();
  const setOpen = useOpenModal();
  const setModalName = useSetModalName();
  return (
    <Dialog open={open && modalStoreName === name} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setModalName(name);
            setOpen(true);
          }}
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
