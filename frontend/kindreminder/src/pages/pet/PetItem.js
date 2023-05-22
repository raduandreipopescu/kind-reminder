import { Card } from "antd";
import DeletePetModal from "./DeletePetModal";
import EditPetModal from "./EditPetModal";

export default function PetItem(props) {
  const handleOk = async () => {
    props.handleOk();
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="pet-card"
        style={{
          width: 500,
          marginBottom: "8px",
        }}
        title={<h3>Pet name: {props.pet.name}</h3>}
      >
        <Card.Meta
          title={<>{props.pet.name}</>}
          description={props.pet.type}
          style={{ marginBottom: "16px" }}
        />
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EditPetModal pet={props.pet} handleOk={handleOk}></EditPetModal>
        <DeletePetModal pet={props.pet} handleOk={handleOk}></DeletePetModal>
      </div>
    </div>
  );
}
