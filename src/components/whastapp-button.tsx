"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const whatsappNumber = "55449864440";
const whatsappMessage = "Olá! Gostaria de falar com a Fluintech.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333a13.2 13.2 0 001.836 6.73L2.667 29.334l6.804-1.784A13.27 13.27 0 0016.004 29.333C23.37 29.333 29.33 23.37 29.33 16S23.37 2.667 16.004 2.667zm0 24a11.634 11.634 0 01-5.916-1.62l-.423-.252-4.04 1.06 1.084-3.957-.275-.41a11.58 11.58 0 1110.57 5.18zM22.13 19.017c-.3-.15-1.77-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.405-1.48-.89-.79-1.49-1.763-1.665-2.063-.175-.3-.018-.463.132-.613.137-.137.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.25-.6-.5-.525-.675-.525h-.575c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.113 3.225 5.138 4.525 2.025.875 2.813.95 3.825.8.625-.093 1.913-.775 2.188-1.525.275-.75.275-1.4.2-1.525-.075-.125-.275-.2-.575-.35z" />
    </svg>
  );
}

export function WhatsAppButton() {
  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="inline-block"
    >
      <Button
        variant="default"
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white transition-transform duration-300 hover:scale-105 flex items-center gap-2 rounded-full px-8 py-4 text-base md:text-lg"
      >
        <WhatsappIcon className="w-5 h-5 md:w-6 md:h-6" />
        WhatsApp: Fale conosco agora
      </Button>
    </Link>
  );
}
