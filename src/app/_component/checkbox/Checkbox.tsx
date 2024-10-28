import { ChangeEventHandler } from "react";
import styles from "./checkbox.module.scss";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({ id, label, checked, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={styles.hiddenCheckbox}
      />
      <label htmlFor={id} className={styles.customLabel}>
        <span className={styles.checkbox}>
          {checked && <span className={styles.checkmark} />}
        </span>
        {label}
      </label>
    </div>
  );
}
