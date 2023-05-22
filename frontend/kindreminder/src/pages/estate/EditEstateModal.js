import { useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export default function EditEstateModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEstate, setNewEstate] = useState(props.estate);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch("/estate/" + newEstate.id, {
      method: "PUT",
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
      <Button type="primary" style={{ marginRight: "4px" }} onClick={showModal}>
        Edit estate
      </Button>
      <Modal
        title={'Edit estate'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Estate type</p>
        <Select
          placeholder="Please select estate type"
          defaultValue={newEstate.type}
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
          value={newEstate.country}
          onChange={setCountry}
          style={{ marginBottom: "16px" }}
        />
        <p>Estate town</p>
        <Input
          value={newEstate.town}
          onChange={setTown}
          style={{ marginBottom: "16px" }}
        />
        <p>Estate street</p>
        <Input
          value={newEstate.street}
          onChange={setStreet}
          style={{ marginBottom: "16px" }}
        />
      </Modal>
    </div>
  );
}
