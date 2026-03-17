export default function GlobalGrid() {
  return (
    <div
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="global-dots"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#global-dots)" />
      </svg>
    </div>
  );
}
