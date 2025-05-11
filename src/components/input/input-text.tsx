import {
	Controller,
	type Control,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

import useDebouncedInput from "@/hooks/use-debounce";

interface IInputText<T extends FieldValues> {
	control?: Control<T>;
	label: string;
	name: Path<T>;
	id: string;
	error?: string;
	placeholder: string;
	onChange?: (value: string | undefined) => void;
	hook?: boolean;
	className?: string;
	value?: string | undefined;
	searchIcon?: boolean;
	debounced?: number; // Optional delay for debounce
}

export default function InputText<T extends FieldValues>({
	control,
	label,
	placeholder,
	name,
	id,
	value,
	error,
	className,
	onChange,
	hook = false,
	searchIcon = false,
	debounced = 300, // Default debounce delay if none is provided
}: IInputText<T>) {
	const { value: val, handleChange } = useDebouncedInput(
		value,
		onChange || (() => {}),
		debounced
	);

	// Handle immediate input change

	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor={name}>{label}</Label>
			{hook ? (
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Input
							aria-label={label}
							placeholder={placeholder}
							id={id}
							className={className}
							defaultValue={val}
							{...field}
						/>
					)}
				/>
			) : (
				<div className="relative w-full">
					<Input
						aria-label={label}
						placeholder={placeholder}
						id={id}
						name={name}
						defaultValue={val}
						className={className}
						onChange={handleChange}
					/>
					{searchIcon && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
							aria-label={"search article"}
						>
							<FaSearch className="text-secondary" />
						</Button>
					)}
				</div>
			)}
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
