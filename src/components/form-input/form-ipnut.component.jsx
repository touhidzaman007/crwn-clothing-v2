import { FormInputLabel, FormInputContainer, Group } from './form-input.styles';
function FormInput({ label, inputOptions }) {
  return (
    <Group>
      <FormInputContainer {...inputOptions} />
      {label && (
        <FormInputLabel
          htmlFor={inputOptions.name}
          shrink={inputOptions.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInput;
