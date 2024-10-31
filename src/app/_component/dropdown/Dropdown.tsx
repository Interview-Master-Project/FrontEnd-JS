import { Menu, Item, Active } from "./index";
import useClickOutside from "@/hooks/useClickOutside";
import clsx from "clsx";
import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  onClose: () => void; // 드롭다운을 닫는 함수
  className?: string; // 사용 쪽에서 스타일 지정(ex. position: absolute)
  disabled?: boolean;
};

function Wrapper({ children, onClose, className, disabled }: Props) {
  const ref = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      className={clsx(styles.dropdown, className, {
        [styles.dropdown__disabled]: disabled,
      })}
    >
      {children}
    </div>
  );
}

export const Dropdown = Object.assign(Wrapper, {
  Menu,
  Item,
  Active,
});
