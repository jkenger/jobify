import { Key } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { capitalize } from "@/utils/capitalize";

type Props<T> = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  options: T[];
};

function DropdownSelect<T>({
  name,
  labelText,
  defaultValue = "",
  onValueChange,
  disabled,
  options,
}: Props<T>) {
  return (
    <Select
      name={name}
      value={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full lg:w-auto">
        <SelectValue placeholder={labelText} />
      </SelectTrigger>
      <SelectContent>
        {options.map((listValue) => (
          <SelectItem key={listValue as Key} value={listValue as string}>
            {capitalize(listValue as string)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DropdownSelect;
