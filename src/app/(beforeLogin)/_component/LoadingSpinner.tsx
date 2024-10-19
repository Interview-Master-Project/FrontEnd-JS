export default function LoadingSpinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="97"
      height="97"
      style={{
        shapeRendering: "auto",
        display: "block",
        // background: "rgb(255, 255, 255)",
      }}
    >
      <g>
        <circle
          cx="50"
          cy="50"
          r="35"
          strokeWidth="10"
          stroke="#309bff"
          fill="none"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1.25s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
