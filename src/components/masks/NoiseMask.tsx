export default function NoiseMask() {
  return (
    <div className="w-[100dvw] h-[100dvh] absolute opacity-4 left-0 top-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="2"
              seed="7"
            />
          </filter>
        </defs>

        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
