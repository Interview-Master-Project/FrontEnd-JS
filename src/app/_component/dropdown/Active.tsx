import styles from "./active.module.scss";

type Props = {
  children: React.ReactNode;
  boxWidth: number;
  boxHeight: number;
  onClick: () => void;
};

export default function Active({
  children,
  boxWidth: width,
  boxHeight: height,
  onClick,
}: Props) {
  return (
    <div
      className={styles.container}
      style={{
        width, // 외부 주입 width
        height, // 외부 주입 height
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClick();
        }
      }}
    >
      {children}
      <button
        className={styles.hiddenButton}
        aria-hidden="true"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation(); // 버튼 클릭 시 부모 이벤트 중단
        }}
      ></button>
    </div>
  );
}
