// components/ui/Button.tsx
import React from "react";
import { Loader2, ArrowRight, ChevronRight, Plus } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "inverted" | "outlined";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-container active:bg-on-primary-container",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-container active:bg-on-secondary-container",
  inverted: "bg-neutral text-inverse-on-surface hover:bg-inverse-surface",
  outlined: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-on-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-md",
  md: "px-5 py-2.5 text-body-md",
  lg: "px-8 py-3.5 text-body-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-sans font-semibold
        transition-all duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

// Boutons prédéfinis pour usage rapide
export const ArrowButton = ({ children, ...props }: Omit<ButtonProps, "rightIcon">) => (
  <Button rightIcon={<ArrowRight className="w-4 h-4" />} {...props}>
    {children}
  </Button>
);

export const NextButton = ({ children, ...props }: Omit<ButtonProps, "rightIcon">) => (
  <Button rightIcon={<ChevronRight className="w-4 h-4" />} {...props}>
    {children}
  </Button>
);

export const AddButton = ({ children, ...props }: Omit<ButtonProps, "leftIcon">) => (
  <Button leftIcon={<Plus className="w-4 h-4" />} {...props}>
    {children}
  </Button>
);

export default Button;