import { Card, Skeleton } from "antd";

export default function CardSkeleton() {
  return (
    <Card style={{ width: "100%" }}>
      <Skeleton.Image active />
      <Skeleton active avatar style={{ marginTop: 10 }} />
    </Card>
  );
}
