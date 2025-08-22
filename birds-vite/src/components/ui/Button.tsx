import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    `inline-flex
    items-center
    justify-center
    rounded-lg
    font-medium
    transition-colors
    
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    
    disabled:pointer-events-none
    disabled:opacity-50
    
    hover:cursor-pointer
    min-w-fit
    px-3 py-1.5`

    const variantStyles = {
      primary: `
        relative
        bg-[#1D60F0]
        text-white
        text-[0.8125rem]
        font-semibold
        hover:bg-[#1552d6]
        disabled:bg-[#1D60F0]
        disabled:opacity-50
        disabled:cursor-not-allowed
        border border-[#1D60F0]
        overflow-hidden
        shadow-[0_1px_1px_-1px_rgba(2,23,44,0.12),0_2px_4px_0_rgba(2,23,44,0.04),inset_0_2px_2px_rgba(255,255,255,0.4)]
        before:content-['']
        before:absolute
        before:inset-x-0
        before:top-0
        before:h-1/2
        before:rounded-t-lg
        before:bg-gradient-to-b
        before:from-white/10
        before:to-transparent
        before:pointer-events-none
      `,
      secondary: `
        border 
        border-[#DADCE0] 
        text-[#152351] 
        bg-white 
        text-[0.8125rem] 
        font-medium 
        hover:bg-blue-mist-50
        shadow-sm
      `,
    }    

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
