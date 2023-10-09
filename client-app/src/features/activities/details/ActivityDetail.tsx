import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import useBoundStore from "../../../app/store/useBoundStore";

export default function ActivityDetail() {
  const { selectedActivity, handleOpenForm, handleCancelSelectActivity } =
    useBoundStore((state) => state);

  return selectedActivity ? (
    <Card
      cover={
        <img
          alt={selectedActivity.category}
          src={`../../../assests/categoryImages/${selectedActivity.category}.jpg`}
        />
      }
      actions={[
        <EditOutlined onClick={() => handleOpenForm(selectedActivity.id)} />,
        <EyeInvisibleOutlined onClick={() => handleCancelSelectActivity()} />,
      ]}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={`${selectedActivity.title} / ${selectedActivity.category}`}
        description={`${new Date(selectedActivity.date).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )} in ${selectedActivity.city}, ${selectedActivity.venue}`}
      />
    </Card>
  ) : (
    <></>
  );
}
