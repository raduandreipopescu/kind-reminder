import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

export default function EditVehicleActivityModal(props) {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicleActivity, setNewVehicleActivity] = useState(
    props.vehicleActivity
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/vehicle-activity/" + newVehicleActivity.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicleActivity),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function setDeadline(date) {
    setNewVehicleActivity({
      ...newVehicleActivity,
      deadline: dayjs(date, "YYYY-MM-DD"),
    });
  }
  function setDescription(e) {
    setNewVehicleActivity({
      ...newVehicleActivity,
      description: e.target.value,
    });
  }

  return (
    <div>
      <Button type="primary" style={{ marginRight: "4px" }} onClick={showModal}>
        Edit activity
      </Button>
      <Modal
        title={`Edit activity: ${newVehicleActivity.activity.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Activity deadline</p>
        <DatePicker
          defaultValue={dayjs(newVehicleActivity.deadline, "YYYY-MM-DD")}
          format="YYYY-MM-DD"
          onChange={setDeadline}
        />
        <p>Activity description</p>
        <TextArea
          rows={8}
          maxLength={500}
          value={newVehicleActivity.description}
          onChange={setDescription}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
