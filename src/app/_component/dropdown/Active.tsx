import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Active({ children, onClick }: Props) {
  return (
    <div className={styles.activeBox}>
      {children}
      <button
        type="button"
        className={styles.active}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClick();
          }
        }}
      ></button>
    </div>
  );
}
