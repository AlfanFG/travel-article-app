import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IInputText<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  error: string | undefined;
  placeholder: string;
  onChange?: (value: string) => void;
}

export default function InputText<T extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  error,
}: IInputText<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label} </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            aria-label={label}
            placeholder={placeholder}
            id={name}
            {...field}
          />
        )}
      />
      {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
    </div>
  );
}
