import { AnimatePresence, motion } from "framer-motion";
import styles from "./menu.module.scss";

type Props = {
  children: React.ReactNode;
  containerWidth: number;
  isOpen: boolean; // 열림 여부
};

export default function Menu({
  children,
  containerWidth: width,
  isOpen,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.menu}
          style={{
            width, // 외부 주입 메뉴 width
          }}
          initial={{ opacity: 1, scale: 0.5, x: 20, y: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 1, scale: 0.5, x: 20, y: -50 }}
        >
          <ul>{children}</ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
