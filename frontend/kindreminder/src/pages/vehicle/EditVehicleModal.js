import { useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export default function EditVehicleModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState(props.vehicle);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/vehicle/" + newVehicle.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicle),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function setType(value) {
    setNewVehicle({ ...newVehicle, type: value });
  }
  function setBrand(e) {
    setNewVehicle({ ...newVehicle, brand: e.target.value });
  }
  function setModel(e) {
    setNewVehicle({ ...newVehicle, model: e.target.value });
  }

  return (
    <div>
      <Button type="primary" style={{ marginRight: "4px" }} onClick={showModal}>
        Edit vehicle
      </Button>
      <Modal
        title={`Edit vehicle ${props.vehicle.plateNumber}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Vehicle type</p>
        <Select
          placeholder="Please select vehicle type"
          defaultValue={newVehicle.type}
          onChange={setType}
          options={[
            { label: "Car", value: "Car" },
            { label: "Motorcycle", value: "Motorcycle" },
            { label: "Bicycle", value: "Bicycle" },
            { label: "Trailer", value: "Trailer" },
            { label: "Boat", value: "Boat" },
            { label: "Recreational Vehicle", value: "Recreational Vehicle" },
            { label: "Other", value: "Other" },
          ]}
          style={{ width: 250 }}
        />
        <p>Vehicle brand</p>
        <Input
          value={newVehicle.brand}
          onChange={setBrand}
          style={{ marginBottom: "16px" }}
        />
        <p>Vehicle model</p>
        <Input
          value={newVehicle.model}
          onChange={setModel}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
