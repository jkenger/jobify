import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Description from "@/components/ui/description";

import { capitalize } from "@/utils/capitalize";
import { useNavigation } from "react-router-dom";
import SpaceRow from "./ui/space-row";
type Props = {
  name: string;
  list: string[];
  defaultValue?: string;
  labelText?: string;
  descriptionText?: string;
};

function FormRowSelect({
  name,
  labelText,
  list,
  defaultValue = "",
  descriptionText,
}: Props) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <SpaceRow>
      <label htmlFor={name}>{labelText || name}</label>
      <Select name={name} defaultValue={defaultValue} disabled={isSubmitting}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={labelText} />
        </SelectTrigger>
        <SelectContent className="w-full">
          {list.map((listValue) => (
            <SelectItem key={listValue} value={listValue}>
              {capitalize(listValue)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Description>{descriptionText}</Description>
    </SpaceRow>
  );
}

export default FormRowSelect;
