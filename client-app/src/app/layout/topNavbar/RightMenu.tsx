import React from "react";
import { Menu, Avatar, MenuProps } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuMode } from "./LeftMenu";

interface Props {
  mode: MenuMode;
}

const items: MenuProps["items"] = [
  {
    label: (
      <>
        <Avatar icon={<UserOutlined />} />
        <span className="username">John Doe</span>
      </>
    ),
    key: "SubMenu",
    children: [
      {
        label: "Projects",
        icon: <CodeOutlined />,
        key: "setting:1",
      },
      {
        label: "Profile",
        icon: <UserOutlined />,
        key: "setting:2",
      },
      {
        label: "Logout",
        icon: <LogoutOutlined />,
        key: "setting:3",
      },
    ],
  },
];

const RightMenu = ({ mode }: Props) => {
  return <Menu mode={mode} items={items} />;
};

export default RightMenu;
