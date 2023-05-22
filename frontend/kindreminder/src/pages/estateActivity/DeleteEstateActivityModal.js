import { useState } from "react";
import { Button, Modal } from "antd";

export default function DeleteEstateActivityModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/estate-activity/" + props.estateActivityId, {
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
