import { Button, Input, Modal, notification, Select } from "antd";
import { useState } from "react";

export default function AddVehicleModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = await fetch("/vehicle/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicle),
    });

    if (!data.ok) {
      const response = await data.json();
      notification.open({
        message: 'Error',
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

  function setPlateNumber(e) {
    setNewVehicle({ ...newVehicle, plateNumber: e.target.value });
  }
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
      <Button
        type="dashed"
        style={{ marginRight: "4px" }}
        size="large"
        onClick={showModal}
      >
        Need to add more? Click here
      </Button>
      <Modal
        title={`Add vehicle`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Plate number</p>
        <Input
          placeholder="Plate number"
          onChange={setPlateNumber}
          style={{ marginBottom: "16px" }}
        />
        <p>Vehicle type</p>
        <Select
          placeholder="Please select vehicle type"
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
          placeholder="Vehicle brand"
          onChange={setBrand}
          style={{ marginBottom: "16px" }}
        />
        <p>Vehicle model</p>
        <Input
          placeholder="Vehicle model"
          onChange={setModel}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
