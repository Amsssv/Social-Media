import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className="container mx-auto max-w-lg">{children}</div>;
};

export default Container;
