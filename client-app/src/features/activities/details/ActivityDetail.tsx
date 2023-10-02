import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import IActivity from "../../../app/Models/activity";

interface Props {
  activity: IActivity | undefined;
  handleCancelSelectActivity: () => void;
  handleOpenForm: (id: string) => void;
}

export default function ActivityDetail({
  activity,
  handleCancelSelectActivity,
  handleOpenForm,
}: Props) {
  return activity ? (
    <Card
      cover={
        <img
          alt={activity.category}
          src={`../../../assests/categoryImages/${activity.category}.jpg`}
        />
      }
      actions={[
        <span onClick={() => handleOpenForm(activity.id)}>edit</span>,
        <span onClick={() => handleCancelSelectActivity()}>Cancel</span>,
      ]}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={`${activity.title} / ${activity.category}`}
        description={`${new Date(activity.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })} in ${activity.city}, ${activity.venue}`}
      />
    </Card>
  ) : (
    <></>
  );
}
