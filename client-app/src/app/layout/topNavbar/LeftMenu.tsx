import React, { useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";

export type MenuMode = "horizontal" | "vertical" | "inline";

interface Props {
  mode: MenuMode;
  handleOpenForm: (id?: string) => void;
}

const items: MenuProps["items"] = [
  {
    label: "Activities",
    key: "Activities",
  },
  {
    label: "Create",
    key: "Create",
  },
];

const LeftMenu = ({ mode, handleOpenForm }: Props) => {
  const [current, setCurrent] = useState("Activities");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if(e.key === "Create")
      handleOpenForm()
    setCurrent(e.key);
  };

  return (
    <Menu mode={mode} onClick={onClick} selectedKeys={[current]} items={items} />
  );
};

export default LeftMenu;
