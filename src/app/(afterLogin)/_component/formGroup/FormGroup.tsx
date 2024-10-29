import clsx from "clsx";
import styles from "./formGroup.module.scss";

type Props = {
  label: string;
  formName: string;
  children: React.ReactNode;
  optional?: boolean;
};

function FormGroupWrapper({
  label,
  formName,
  children,
  optional = false,
}: Props) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={formName}>
        {label}
        {optional && <p>선택 옵션</p>}
      </label>
      {children}
    </div>
  );
}

type TMessage = {
  validity: boolean | null;
  children: React.ReactNode;
};

function Message({ validity, children }: TMessage) {
  if (validity === null) return null;

  return (
    <div
      className={clsx(styles.message, {
        [styles.message__valid]: validity,
        [styles.message__invalid]: !validity,
      })}
    >
      {children}
    </div>
  );
}

export const FormGroup = Object.assign(FormGroupWrapper, {
  Message,
});
