import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  href?: string
  className?: string
}

export function Logo({ size = "medium", href = "/", className = "" }: LogoProps) {
  const sizes = {
    small: { dimension: 32, containerClass: "w-8 h-8" },
    medium: { dimension: 40, containerClass: "w-10 h-10" },
    large: { dimension: 80, containerClass: "w-20 h-20" },
  }

  const { dimension, containerClass } = sizes[size]

  const logoContent = (
    <div className={`${containerClass} flex-shrink-0 transition-transform duration-150 hover:scale-110`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Fluintech"
        role="img"
      >
        <path d="M 14 22 C 38 22 56 47 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
        <path d="M 14 50 C 38 50 56 50 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
        <path d="M 14 78 C 38 78 56 53 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
        <circle cx="14" cy="22" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
        <circle cx="14" cy="50" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
        <circle cx="14" cy="78" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
        <circle cx="73" cy="50" r="12" fill="#23C9B6"/>
      </svg>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {logoContent}
      </Link>
    )
  }

  return <div className={className}>{logoContent}</div>
}
