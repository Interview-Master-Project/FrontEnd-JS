import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import styles from "./menu.module.scss";

type Props = {
  children: React.ReactNode;
  positionLeft?: boolean;
  containerWidth: number;
  positionTop?: number;
  variant?: "background" | "foreground";
  isOpen: boolean; // 열림 여부
};

export default function Menu({
  children,
  positionLeft,
  containerWidth: width,
  positionTop: top = 30,
  variant = "background",
  isOpen,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(styles.menu, {
            [styles.menu__left]: positionLeft,
            [styles.menu__foreground]: variant === "foreground",
          })}
          style={{
            width, // 외부 주입 메뉴 width
            top, // optional 외부 주입 메뉴 위치
          }}
          initial={{ opacity: 1, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 1, scale: 0.5, x: 20, y: -50 }}
        >
          <ul>{children}</ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
