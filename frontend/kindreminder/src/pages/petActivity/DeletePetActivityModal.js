import { Button, Modal } from "antd";
import { useState } from "react";

export default function DeletePetActivityModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/pet-activity/" + props.petActivityId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        danger
        style={{ marginRight: "4px" }}
        onClick={showModal}
      >
        Delete activity
      </Button>
      <Modal
        title={`Delete activity?`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
}
