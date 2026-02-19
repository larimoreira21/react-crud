import { forwardRef } from 'react';
import { classNames } from '../../helpers/theme';

const variantClasses = {
  default: 'bg-white text-black',
  outline: 'bg-transparent text-white border border-gray-600',
};

type InputVariant = keyof typeof variantClasses;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
