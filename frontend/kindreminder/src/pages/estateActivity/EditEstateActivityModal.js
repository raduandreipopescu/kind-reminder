import { useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";

export default function EditEstateActivityModal(props) {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEstateActivity, setNewEstateActivity] = useState(
    props.estateActivity
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/estate-activity/" + newEstateActivity.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEstateActivity),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Button type="primary" style={{ marginRight: "4px" }} onClick={showModal}>
        Edit activity
      </Button>
      <Modal
        title={`Edit activity: ${newEstateActivity.activity.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Activity deadline</p>
        <DatePicker
          defaultValue={dayjs(newEstateActivity.deadline, "YYYY-MM-DD")}
          format="YYYY-MM-DD"
          onChange={setDeadline}
        />
        <p>Activity description</p>
        <TextArea
          rows={8}
          maxLength={500}
          value={newEstateActivity.description}
          onChange={setDescription}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
