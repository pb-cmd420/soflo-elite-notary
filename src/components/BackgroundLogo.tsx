import Image from "next/image";

export default function BackgroundLogo() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <Image
          src="/hero-logo.jpg"
          alt=""
          width={500}
          height={250}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}