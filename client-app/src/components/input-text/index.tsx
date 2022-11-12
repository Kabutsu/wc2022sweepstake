import { useController, UseControllerProps } from "react-hook-form";
import { BaseFieldProps } from 'redux-form';

type TProps = Omit<BaseFieldProps, 'name'> & UseControllerProps<any> & {
  label?: string;
  placeholder?: string;
}

const InputText = (props: TProps) => {
  const { fieldState, field: { value, onChange, onBlur } } = useController(props);
  const { label, placeholder, name } = props;

  return (
    <div className="c-input-text__container">
      {label && (
        <label htmlFor={name} className="c-input-text__label">
          {label}
        </label>
      )}
      <div className="c-input-text__input-container">
        <input
          id={name}
          type="text"
          className="o-input c-input-text__entry"
          value={value}
          placeholder={placeholder}
          onChange={(e: any) => onChange(e.target.value)}
          onBlur={(e: any) => onBlur()}
        />
      </div>
    </div>
  );
};

export default InputText;