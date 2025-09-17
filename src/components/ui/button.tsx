import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
    const variants = {
      default: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
      outline: "border border-muted text-foreground bg-transparent hover:bg-secondary",
    }
    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 px-4",
      lg: "h-11 px-6",
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    )
  }
)

Button.displayName = "Button"


