type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        disabled && "btn--disabled",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
};
