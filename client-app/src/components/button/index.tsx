import './button.scss';

type TProps = {
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
};

const Button = ({ type = 'button', className, onClick, children }: TProps) => (
    <button type={type} id="button" onClick={onClick} className={`${className} c-button`}>
        {children}
    </button>
);

export default Button;
