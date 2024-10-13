type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Active({ children, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}
