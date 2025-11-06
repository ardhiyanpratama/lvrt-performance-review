import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "md" | "lg";
  variant?: "default" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "default",
  ...props
}) => {
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base";

  const getVariantClasses = () => {
    if (props.disabled) {
      return "bg-muted text-muted-foreground cursor-not-allowed";
    }

    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:text-black active:scale-95 transform px-4 py-2 rounded-lg transition";
      case "default":
      default:
        return "bg-white text-black hover:bg-white-700 active:scale-95 transform";
    }
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center w-full gap-3
         font-semibold rounded-lg transition-all duration-300
         focus:outline-none focus:ring-2 focus:ring-white-400 focus:ring-offset-2
            ${getVariantClasses()}
            ${sizeClasses}
            ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
