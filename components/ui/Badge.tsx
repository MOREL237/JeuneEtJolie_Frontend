// components/ui/Badge.tsx
import React from "react";
import { Tag, Star, Truck, Check, AlertCircle } from "lucide-react";

export type BadgeIcon = "tag" | "star" | "truck" | "check" | "alert";

type BadgeVariant = "primary" | "secondary" | "tertiary" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: BadgeIcon | React.ReactNode;
  className?: string;
}

const iconMap: Record<BadgeIcon, React.ComponentType<{ className?: string }>> = {
  tag: Tag,
  star: Star,
  truck: Truck,
  check: Check,
  alert: AlertCircle,
};

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
  neutral: "bg-neutral text-inverse-on-surface",
};

export const Badge = ({
  children,
  variant = "primary",
  icon,
  className = "",
}: BadgeProps) => {
  const IconComponent = typeof icon === "string" ? iconMap[icon] : null;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-label-md font-semibold
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {typeof icon === "string" && IconComponent ? (
        <IconComponent className="w-3.5 h-3.5" />
      ) : (
        icon
      )}
      {children}
    </span>
  );
};

// Badge prédéfinis pour usage rapide
export const TagBadge = ({ children, ...props }: Omit<BadgeProps, "icon">) => (
  <Badge icon="tag" {...props}>{children}</Badge>
);

export const StarBadge = ({ children, ...props }: Omit<BadgeProps, "icon">) => (
  <Badge icon="star" variant="tertiary" {...props}>{children}</Badge>
);

export const DeliveryBadge = ({ children, ...props }: Omit<BadgeProps, "icon">) => (
  <Badge icon="truck" variant="secondary" {...props}>{children}</Badge>
);

export default Badge;