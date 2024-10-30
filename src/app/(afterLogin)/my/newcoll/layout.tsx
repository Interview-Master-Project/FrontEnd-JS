import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <div style={{ width: 750, margin: "0 auto" }}>{children}</div>;
}
