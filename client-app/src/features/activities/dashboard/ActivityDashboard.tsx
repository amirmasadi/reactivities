import { Col, Row, Space } from "antd";
import ActivityList from "./ActivityList";

export default function ActiviryDashboard() {
  return (
    <Row className="container" gutter={16}>
      <Col span={16}>
        <ActivityList />
      </Col>
      <Col span={8}>
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <h2>Activities Filter Here!</h2>
        </Space>
      </Col>
    </Row>
  );
}
