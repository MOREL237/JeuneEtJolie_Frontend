// components/ui/IconButton.tsx
import React from "react";
import { 
  Home, 
  Search, 
  User, 
  ShoppingCart,
  Pencil,
  Trash2,
  Heart,
  Menu,
  X
} from "lucide-react";

export type IconName = 
  | "home" 
  | "search" 
  | "user" 
  | "cart" 
  | "edit" 
  | "delete" 
  | "heart" 
  | "menu" 
  | "x";

type IconButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName | React.ReactNode;
  variant?: IconButtonVariant;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  home: Home,
  search: Search,
  user: User,
  cart: ShoppingCart,
  edit: Pencil,
  delete: Trash2,
  heart: Heart,
  menu: Menu,
  x: X,
};

const variantStyles: Record<IconButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-container",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-container",
  tertiary: "bg-tertiary text-on-tertiary hover:bg-tertiary-container",
  ghost: "bg-transparent text-on-surface hover:bg-surface-container-high",
};

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const IconButton = ({
  icon,
  variant = "ghost",
  size = "md",
  label,
  className = "",
  ...props
}: IconButtonProps) => {
  const IconComponent = typeof icon === "string" ? iconMap[icon as IconName] : null;

  return (
    <button
      type="button"
      aria-label={label || (typeof icon === "string" ? icon : "icon")}
      className={`
        inline-flex items-center justify-center
        rounded-full
        transition-all duration-300 ease-in-out
        hover:shadow-hover
        active:scale-95
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {typeof icon === "string" && IconComponent ? (
        <IconComponent className={iconSizes[size]} />
      ) : (
        icon
      )}
    </button>
  );
};

// Export des icônes pour usage direct
export { Home, Search, User, ShoppingCart, Pencil, Trash2, Heart, Menu, X };
export default IconButton;