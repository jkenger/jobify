import { Input } from "./ui/input";
import Description from "./ui/description";
import { useNavigation } from "react-router-dom";
import SpaceRow from "./ui/space-row";

type Props = {
  name: string;
  labelText?: string;
  descriptionText?: string;
  defaultValue?: string;
};

function FormRowInput({
  name,
  labelText,
  descriptionText,
  defaultValue = "",
}: Props) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <SpaceRow>
      <label>{labelText || name}</label>
      <Input
        type="text"
        name={name}
        placeholder={labelText}
        defaultValue={defaultValue}
        disabled={isSubmitting}
      />
      <Description>{descriptionText}</Description>
    </SpaceRow>
  );
}

export default FormRowInput;
