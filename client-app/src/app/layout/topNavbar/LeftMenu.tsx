import React, { useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

export type MenuMode = "horizontal" | "vertical" | "inline";

interface Props {
  mode: MenuMode;
}

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "/",
  },
  {
    label: "Activities",
    key: "activities",
  },
  {
    label: "Create",
    key: "form",
  },
];

const LeftMenu = ({ mode }: Props) => {
  const [current, setCurrent] = useState("Activities");
  const navigate = useNavigate(); 

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      mode={mode}
      onClick={onClick}
      selectedKeys={[current]}
      items={items}
    />
  );
};

export default LeftMenu;
