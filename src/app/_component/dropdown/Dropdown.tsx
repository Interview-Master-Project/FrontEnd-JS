import { Menu, Item, Active } from "./index";
import useClickOutside from "@/hooks/useClickOutside";
import clsx from "clsx";
import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  onActive: () => void;
  className?: string;
};

function Wrapper({ children, onActive, className }: Props) {
  const dropdownRef = useClickOutside(onActive);

  return (
    <div ref={dropdownRef} className={clsx(styles.dropdown, className)}>
      {children}
    </div>
  );
}

export const Dropdown = Object.assign(Wrapper, {
  Menu,
  Item,
  Active,
});
