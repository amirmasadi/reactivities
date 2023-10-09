import { Col, Row, Space } from "antd";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import useBoundStore from "../../../app/store/useBoundStore";

export default function ActiviryDashboard() {
  const { showForm, activities } = useBoundStore((state) => state);
  return (
    <Row className="container" gutter={16}>
      <Col span={16}>
        <ActivityList />
      </Col>
      <Col span={8}>
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
          {activities[0] && !showForm && (
            <ActivityDetail />
          )}
          {showForm && (
            <ActivityForm />
          )}
        </Space>
      </Col>
    </Row>
  );
}
