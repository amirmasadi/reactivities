import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import useBoundStore from "../../../app/store/useBoundStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CardSkeleton from "../../../app/layout/CardSkeleton";

export default function ActivityDetail() {
  const { selectedActivity, getActivity } = useBoundStore((state) => state);
  const { activityId } = useParams();
  useEffect(() => {
    if (activityId) getActivity(activityId);
  }, [activityId, getActivity]);

  return selectedActivity ? (
    <Card
      cover={
        <img
          alt={selectedActivity.category}
          src={`../../../assests/categoryImages/${selectedActivity.category}.jpg`}
        />
      }
      actions={[<EditOutlined />, <EyeInvisibleOutlined />]}
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
    <CardSkeleton />
  );
}
