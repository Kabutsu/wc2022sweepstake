import { DataOptionType } from 'src/types/general';
import Tooltip from '../tooltip';

import './input-radio.scss';

type InputRadioProps = {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    checked?: boolean;
    tooltip?: string;
};

export const InputRadio = ({ id, label, value, onChange, checked = false, tooltip }: InputRadioProps) => (
    <div id={id} className="c-input-radio">
        <input
            id={id}
            type="radio"
            checked={checked}
            onChange={() => onChange(value)}
        />
        <label htmlFor={id} className="c-input-radio__label">
            {label}
            {!!tooltip && (
                <Tooltip label={tooltip} />
            )}
        </label>
    </div>
);

export interface RadioOptionType extends DataOptionType {
    tooltip?: string;
}

type RadioGroupProps = {
    id: string;
    options: Array<RadioOptionType>;
    value: number;
    onChange: (value: number) => void;
    direction?: 'horizontal' | 'vertical';
    className?: string;
};

export const RadioGroup = ({ id, options, value, onChange, direction = 'vertical', className }: RadioGroupProps) => (
    <div id={`radio-group__${id}`} className={`c-radio-group c-radio-group--${direction} ${className}`}>
        {options.map(({ label: inputLabel, value: inputValue, tooltip }) => (
            <InputRadio
                key={`${id}__${inputValue}`}
                id={`${id}__${inputValue}`}
                value={inputValue}
                checked={inputValue === value}
                label={inputLabel}
                tooltip={tooltip}
                onChange={onChange}
            />
        ))}
    </div>
);
