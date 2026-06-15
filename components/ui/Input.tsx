// components/ui/Input.tsx
import React from "react";
import { Search } from "lucide-react";

type InputVariant = "default" | "search";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  variant = "default",
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: InputProps) => {
  const isSearch = variant === "search";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-label-md text-on-surface-variant mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            w-full bg-surface-container-low text-on-surface
            border border-outline rounded-lg
            placeholder:text-on-surface-variant/50
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition-all duration-300
            ${isSearch ? "pl-10 pr-4 py-2.5" : "px-4 py-3"}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${error ? "border-error focus:border-error focus:ring-error/30" : ""}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

// SearchBar avec Lucide
export const SearchBar = ({
  className = "",
  ...props
}: Omit<InputProps, "variant" | "leftIcon">) => {
  return (
    <Input
      variant="search"
      leftIcon={<Search className="w-5 h-5" />}
      placeholder="Rechercher..."
      className={`max-w-md ${className}`}
      {...props}
    />
  );
};

export default Input;