import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import IActivity from "../../../app/Models/activity";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  activities: IActivity[];
  handleSelectedActivity: (id: string) => void;
  deleteActivityHandler: (id: string) => void;
}

export default function ActivityList({
  activities,
  handleSelectedActivity,
  deleteActivityHandler,
}: Props) {
  return (
    <Row gutter={[24, 24]}>
      {activities.map((activity) => (
        <Col xs={24} md={12} lg={8} key={activity.id}>
          <Card
            cover={
              <img
                alt={activity.category}
                src={`../../../assests/categoryImages/${activity.category}.jpg`}
              />
            }
            actions={[
              <span onClick={() => deleteActivityHandler(activity.id)}>
                Delete
              </span>,
              <span onClick={() => handleSelectedActivity(activity.id)}>
                View
              </span>,
            ]}
          >
            <Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={`${activity.title} / ${activity.category}`}
              description={`${new Date(activity.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )} in ${activity.city}, ${activity.venue}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
