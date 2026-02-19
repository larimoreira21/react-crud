import { classNames } from '../../helpers/theme';

const variantClasses = {
  default:
    'px-4 py-2 rounded-md bg-transparent text-gray-300 font-medium hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600',
  primary:
    'px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'px-4 py-2 rounded-md bg-secondary text-white font-medium hover:bg-secondary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  danger:
    'px-4 py-2 rounded-md bg-danger text-white font-medium hover:bg-danger/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
};

type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
};

const Button = ({
  children,
  className,
  variant = 'default',
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        'inline-flex items-center gap-2',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
