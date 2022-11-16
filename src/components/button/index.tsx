import './button.scss';

type TProps = {
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

const Button = ({ type = 'button', className, onClick, disabled = false, children }: TProps) => (
    <button type={type} id="button" onClick={onClick} disabled={disabled} className={`${className} c-button`}>
        {children}
    </button>
);

export default Button;
