import * as React from "react"

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "default" | "destructive"
        size?: "default" | "icon"
    }
>(({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
        ref={ref}
        className={className}
        {...props}
    />
))
Button.displayName = "Button"

export { Button }
