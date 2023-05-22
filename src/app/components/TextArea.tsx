import { TextareaHTMLAttributes } from "react";
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
interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  disabled?: boolean;
  trigger?: UseFormTrigger<any>;
  placeholder?: string;
}

export default function TextArea({
  register,
  name,  
  disabled,
  trigger,
  placeholder,
  errors,
  ...remaining
}: InputProps) {
  const hasErrors = errors && errors[name];  
  return (
    <div>
      <textarea
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        onChange={() => {
          trigger && trigger();
        }}
        {...remaining}
        className={`w-full font-[600] outline-none m-0 shadow-none px-4 py-2 rounded-md ${hasErrors ? 'border-2 border-red-500' : ''}`}
      />
      {errors && formValidation(errors, name)}
    </div>
  );
}
