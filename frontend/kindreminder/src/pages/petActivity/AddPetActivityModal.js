import { Button, DatePicker, Input, Modal, notification, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

export default function AddPetActivityModal(props) {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPetActivity, setNewPetActivity] = useState({
    pet: props.pet,
  });
  const activities = props.activities;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = await fetch("/pet-activity", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPetActivity),
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
    setNewPetActivity({
      ...newPetActivity,
      activity: filteredActivity[0],
    });
  };
  function setDeadline(date) {
    setNewPetActivity({
      ...newPetActivity,
      deadline: dayjs(date, "YYYY-MM-DD"),
    });
  }
  function setDescription(e) {
    setNewPetActivity({
      ...newPetActivity,
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
