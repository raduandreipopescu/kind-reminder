import { Button, Input, Modal, Select } from "antd";
import { useState } from "react";

export default function AddPetModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPet, setNewPet] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/pet/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function setType(value) {
    setNewPet({ ...newPet, type: value });
  }
  function setName(e) {
    setNewPet({ ...newPet, name: e.target.value });
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
        title={`Add pet`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Pet type</p>
        <Select
          placeholder="Please select vehicle type"
          onChange={setType}
          options={[
            { label: "Cat", value: "Cat" },
            { label: "Dog", value: "Dog" },
            { label: "Fish", value: "Fish" },
            { label: "Bird", value: "Bird" },
            { label: "Rabbit", value: "Rabbit" },
            { label: "Hamster", value: "Hamster" },
            { label: "Reptile", value: "Reptile" },
            { label: "Other", value: "Other" },
          ]}
          style={{ width: 250 }}
        />
        <p>Pet name</p>
        <Input
          placeholder="Pet name"
          onChange={setName}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
