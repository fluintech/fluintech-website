import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  href?: string
  className?: string
}

export function Logo({ size = "medium", href = "/", className = "" }: LogoProps) {
  const sizes = {
    small: { width: 32, height: 32, containerClass: "w-8 h-8" },
    medium: { width: 40, height: 40, containerClass: "w-10 h-10" },
    large: { width: 80, height: 80, containerClass: "w-20 h-20" },
  }

  const currentSize = sizes[size]

  const logoContent = (
    <div className={`${currentSize.containerClass} relative flex-shrink-0 transition-transform hover:scale-110 bg-transparent`}>
      <Image
        src="/logo.png"
        alt="Fluintech Logo"
        width={currentSize.width}
        height={currentSize.height}
        priority
        className="object-contain brightness-150 contrast-150 drop-shadow-lg"
        style={{ backgroundColor: "transparent" }}
      />
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