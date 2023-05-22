import { useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export default function AddEstateModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEstate, setNewEstate] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/estate/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEstate),
    });

    props.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function setType(value) {
    setNewEstate({ ...newEstate, type: value });
  }
  function setCountry(e) {
    setNewEstate({ ...newEstate, country: e.target.value });
  }
  function setTown(e) {
    setNewEstate({ ...newEstate, town: e.target.value });
  }
  function setStreet(e) {
    setNewEstate({ ...newEstate, street: e.target.value });
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
        title={`Add estate`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Estate type</p>
        <Select
          placeholder="Please select estate type"
          onChange={setType}
          options={[
            { label: "Apartment", value: "Apartment" },
            { label: "House", value: "House" },
            { label: "Holiday house", value: "Holiday house" },
            { label: "Other", value: "Other" },
          ]}
          style={{ width: 250 }}
        />
        <p>Estate country</p>
        <Input
          placeholder="Estate country"
          onChange={setCountry}
          style={{ marginBottom: "16px" }}
        />
        <p>Estate town</p>
        <Input
          placeholder="Estate town"
          onChange={setTown}
          style={{ marginBottom: "16px" }}
        />
        <p>Estate street</p>
        <Input
          placeholder="Estate street"
          onChange={setStreet}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
