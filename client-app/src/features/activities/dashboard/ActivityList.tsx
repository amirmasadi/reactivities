import { Avatar, Card, Col, Row, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import CardSkeleton from "../../../app/layout/CardSkeleton";
import { SyntheticEvent, useState } from "react";
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import useBoundStore from "../../../app/store/useBoundStore";

export default function ActivityList() {
  const [target, setTarget] = useState("");
  const {
    getActivitiesByDate,
    initialLoading,
    submitting,
    deleteActivityHandler,
    handleSelectedActivity,
  } = useBoundStore((state) => state);
  function handleDeleteActivity(
    e: SyntheticEvent<HTMLSpanElement>,
    id: string
  ) {
    setTarget(e.currentTarget.attributes[2].value);
    deleteActivityHandler(id);
  }

  return (
    <Row gutter={[24, 24]}>
      {!initialLoading
        ? getActivitiesByDate().map((activity) => (
            <Col xs={24} md={12} lg={8} key={activity.id}>
              <Card
                cover={
                  <img
                    alt={activity.category}
                    src={`../../../assests/categoryImages/${activity.category}.jpg`}
                  />
                }
                actions={[
                  submitting && target === activity.id ? (
                    <LoadingOutlined />
                  ) : (
                    <DeleteOutlined
                      key="delete"
                      name={activity.id}
                      onClick={(e) => handleDeleteActivity(e, activity.id)}
                    />
                  ),
                  <EyeOutlined
                    onClick={() => handleSelectedActivity(activity.id)}
                  />,
                ]}
              >
                <Skeleton loading={initialLoading} avatar active>
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
                </Skeleton>
              </Card>
            </Col>
          ))
        : Array(6)
            .fill(0)
            .map((itm, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <CardSkeleton />
              </Col>
            ))}
    </Row>
  );
}
