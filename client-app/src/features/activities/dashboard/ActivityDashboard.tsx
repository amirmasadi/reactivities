import { Col, Row, Space } from "antd";
import IActivity from "../../../app/Models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: IActivity[];
  selectedActivity: IActivity | undefined;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  showForm: boolean;
  handleOpenForm: (id: string) => void;
  handleCloseForm: () => void;
  crateAndEditActivityHandler: (activity: IActivity) => void;
  deleteActivityHandler: (id: string) => void;
  loading : boolean
  submitting : boolean
}

export default function ActiviryDashboard({
  activities,
  selectedActivity,
  handleSelectedActivity,
  handleCancelSelectActivity,
  showForm,
  handleOpenForm,
  handleCloseForm,
  crateAndEditActivityHandler,
  deleteActivityHandler,
  loading,
  submitting
}: Props) {
  return (
    <Row className="container" gutter={16}>
      <Col span={16}>
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          deleteActivityHandler={deleteActivityHandler}
          loading={loading}
          submitting={submitting}
        />
      </Col>
      <Col span={8}>
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
          {activities[0] && !showForm && (
            <ActivityDetail
              activity={selectedActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
              handleOpenForm={handleOpenForm}
            />
          )}
          {showForm && (
            <ActivityForm
              handleCloseForm={handleCloseForm}
              activity={selectedActivity}
              crateAndEditActivityHandler={crateAndEditActivityHandler}
              submitting={submitting}
            />
          )}
        </Space>
      </Col>
    </Row>
  );
}
