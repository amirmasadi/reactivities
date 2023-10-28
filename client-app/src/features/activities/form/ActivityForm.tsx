import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useEffect, useState } from "react";
import * as dayjs from "dayjs";
import useBoundStore from "../../../app/store/useBoundStore";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function ActivityForm() {
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: new Date().toISOString(),
    city: "",
    venue: "",
  });

  const { getActivity, submitting, updateActivity, createActivity } =
    useBoundStore((state) => state);
  const { activityId } = useParams();
  let { pathname: location } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActivity({
      id: "",
      title: "",
      description: "",
      category: "",
      date: new Date().toISOString(),
      city: "",
      venue: "",
    });
  }, [location]);

  useEffect(() => {
    if (activityId)
      getActivity(activityId).then((activity) => setActivity(activity!));
  }, [activityId, getActivity]);

  function formSubmitHnadler() {
    if (activity.id === "") {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate("/activities/" + activity.id)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate("/activities/" + activity.id)
      );
    }
  }

  function inputChagneHandler(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function categorySelectChagneHandler(value: string) {
    setActivity({ ...activity, category: value });
  }

  function DatePickerChangeHandler(event: any) {
    setActivity({ ...activity, date: event?.toDate().toISOString() });
  }

  return (
    <Card>
      <Form layout="horizontal">
        <Form.Item>
          <Input
            placeholder="Title"
            name="title"
            value={activity.title}
            onChange={inputChagneHandler}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            onChange={inputChagneHandler}
            rows={3}
            placeholder="Description"
            name="description"
            value={activity.description}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Category"
            value={activity.category}
            onChange={categorySelectChagneHandler}
          >
            <Select.Option value="film">film</Select.Option>
            <Select.Option value="drinks">drinks</Select.Option>
            <Select.Option value="music">music</Select.Option>
            <Select.Option value="travel">travel</Select.Option>
            <Select.Option value="culture">culture</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <DatePicker
            placeholder="Date"
            name="date"
            defaultValue={dayjs.default(activity.date)}
            onChange={DatePickerChangeHandler}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="City"
            name="city"
            value={activity.city}
            onChange={inputChagneHandler}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Venue"
            name="venue"
            value={activity.venue}
            onChange={inputChagneHandler}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={formSubmitHnadler}
            disabled={submitting}
          >
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default">Cancel</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
