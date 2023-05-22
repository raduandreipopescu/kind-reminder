import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

export default function EditPetActivityModal(props) {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPetActivity, setNewPetActivity] = useState(props.petActivity);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/pet-activity/" + newPetActivity.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPetActivity),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Button type="primary" style={{ marginRight: "4px" }} onClick={showModal}>
        Edit activity
      </Button>
      <Modal
        title={`Edit activity: ${newPetActivity.activity.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Activity deadline</p>
        <DatePicker
          defaultValue={dayjs(newPetActivity.deadline, "YYYY-MM-DD")}
          format="YYYY-MM-DD"
          onChange={setDeadline}
        />
        <p>Activity description</p>
        <TextArea
          rows={8}
          maxLength={500}
          value={newPetActivity.description}
          onChange={setDescription}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
