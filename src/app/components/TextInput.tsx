import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { InputError } from "../styled-components/input-error.styled.component";
const formValidation = (errors: FieldErrors, errorKey: string) => {
  return errors[errorKey] ? (
    <InputError className="error-message">
      {errors[errorKey]?.message?.toString()}
    </InputError>
  ) : (
    ""
  );
};
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  type: InputType;
  InputProps?: any;
  disabled?: boolean;
  trigger?: UseFormTrigger<any>;
  placeholder?: string;
}

export enum InputType {
  NUMBER = "number",
  PASSWORD = "password",
  SEARCH = "search",
  TEXT = "text",
  HIDDEN = "hidden",
  CHECKBOX = "checkbox",
}

export default function TextInput({
  register,
  name,
  type,
  InputProps,
  disabled,
  trigger,
  placeholder,
  errors,
}: InputProps) {
  return (
    <div>
      <input
        id={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...(InputProps && { InputProps: InputProps })}
        onChange={() => {
          trigger && trigger();
        }}
        className={`w-full font-[600] outline-none m-0 shadow-none px-4 py-2 rounded-md ${errors[name] ? 'border-2 border-red-500' : ''}`}
      />
      {errors && formValidation(errors, name)}
    </div>
  );
}
