import { Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const TopMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location]);
  
  return (
    <nav className="navbar">
      <div className="nav-header container">
        <div className="logo">
          <h3 className="brand-font">Reactivities</h3>
        </div>
        <div className="navbar-menu">
          <div className="leftMenu">
            <LeftMenu mode={"horizontal"} />
          </div>
          <Button className="menuButton" type="text" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <div className="rightMenu">
            <RightMenu mode={"horizontal"} />
          </div>

          <Drawer
            title={"Brand Here"}
            placement="right"
            closable={true}
            onClose={showDrawer}
            open={visible}
            style={{ zIndex: 99999 }}
          >
            <LeftMenu mode={"inline"} />
            <RightMenu mode={"inline"} />
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
