import { Card } from "antd";
import DeleteVehicleModal from "./DeleteVehicleModal";
import EditVehicleModal from "./EditVehicleModal";

export default function VehicleItem(props) {
  const handleOk = async () => {
    props.handleOk();
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="vehicle-card"
        style={{
          width: 500,
          marginBottom: "8px",
        }}
        title={<h3>Plate number: {props.vehicle.plateNumber}</h3>}
      >
        <Card.Meta
          title={
            <>
              {props.vehicle.brand} {props.vehicle.model}
            </>
          }
          description={props.vehicle.type}
          style={{ marginBottom: "16px" }}
        />
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EditVehicleModal
          vehicle={props.vehicle}
          handleOk={handleOk}
        ></EditVehicleModal>
        <DeleteVehicleModal
          vehicle={props.vehicle}
          handleOk={handleOk}
        ></DeleteVehicleModal>
      </div>
    </div>
  );
}
