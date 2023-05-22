import { useState } from "react";
import { Button, DatePicker, Input, Modal, notification, Select } from "antd";
import dayjs from "dayjs";

export default function AddEstateActivityModal(props) {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEstateActivity, setNewEstateActivity] = useState({
    estate: props.estate,
  });
  const activities = props.activities;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = await fetch("/estate-activity", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEstateActivity),
    });
    if (!data.ok) {
      const response = await data.json();
      notification.open({
        message: "Error",
        description: response.message,
      });
    } else {
      props.handleOk();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setActivity = (value) => {
    const filteredActivity = activities.filter((activity) => {
      return activity.id === parseInt(value);
    });
    setNewEstateActivity({
      ...newEstateActivity,
      activity: filteredActivity[0],
    });
  };
  function setDeadline(date) {
    setNewEstateActivity({
      ...newEstateActivity,
      deadline: dayjs(date, "YYYY-MM-DD"),
    });
  }
  function setDescription(e) {
    setNewEstateActivity({
      ...newEstateActivity,
      description: e.target.value,
    });
  }

  return (
    <div>
      <Button
        type="dashed"
        style={{ marginRight: "4px" }}
        size="large"
        onClick={showModal}
      >
        Schedule another activity? Click here
      </Button>
      <Modal
        title={`Schedule activity`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Select activity</p>
        <Select
          placeholder="Please select activity"
          onChange={setActivity}
          options={props.activities.map((activity) => ({
            label: activity.name,
            value: activity.id,
          }))}
          style={{ width: 250 }}
        />
        <p>Deadline</p>
        <DatePicker onChange={setDeadline} />
        <p>Description</p>
        <TextArea
          rows={8}
          maxLength={500}
          placeholder="Description"
          onChange={setDescription}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
