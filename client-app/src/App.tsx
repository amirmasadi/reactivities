import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { List } from "antd";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Activities").then((res) => {
      setActivities(res.data);
    });
  }, []);

  return (
    <List
    itemLayout="horizontal"
    dataSource={activities}
    renderItem={(item : any, index) => (
      <List.Item>
        <List.Item.Meta
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
  );
}

export default App;
