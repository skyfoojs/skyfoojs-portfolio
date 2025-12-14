import { ReactNode } from "react";

const DotBackground = ({ children }: { children: ReactNode }) => {
  return <div className="dot-background-container">{children}</div>;
};

export default DotBackground;
