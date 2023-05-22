import { useState } from "react";
import { Button, Modal } from "antd";

export default function DeleteVehicleModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/vehicle/" + props.vehicle.id, {
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
        Delete vehicle
      </Button>
      <Modal
        title={`Delete vehicle ${props.vehicle.plateNumber}?`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
}
