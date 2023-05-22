import { useEffect, useState } from "react";
import { Card, Col, Divider, Popover, Row, Space, Typography } from "antd";
import AddVehicleActivityModal from "./AddVehicleActivityModal";
import DeleteVehicleActivityModal from "./DeleteVehicleActivityModal";
import EditVehicleActivityModal from "./EditVehicleActivityModal";

export default function VehicleActivityItem(props) {
  const { Text } = Typography;
  const [vehicleActivities, setVehicleActivities] = useState([]);

  const getVehicleActivities = async () => {
    const data = await fetch("/vehicle-activity/vehicleId/" + props.vehicle.id);
    const response = await data.json();
    setVehicleActivities(response);
  };

  const handleOk = async () => {
    getVehicleActivities();
  };

  useEffect(() => {
    getVehicleActivities();
  }, []);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="vehicle-activity-card"
        style={{
          width: 1000,
          marginBottom: "8px",
        }}
        title={
          <Row align="middle">
            <Col flex="auto">
              <h3>{props.vehicle.plateNumber} schedule</h3>
              {props.vehicle.type}: {props.vehicle.brand} {props.vehicle.model}
            </Col>
            <Col flex="100px">
              <AddVehicleActivityModal
                handleOk={handleOk}
                vehicle={props.vehicle}
                activities={props.activities}
              ></AddVehicleActivityModal>
            </Col>
          </Row>
        }
      >
        {vehicleActivities.map((vehicleActivity) => (
          <Card.Grid key={vehicleActivity.id}>
            <Card.Meta
              description={
                <>
                  Name: {vehicleActivity.activity.name}
                  <Divider dashed />
                  Deadline: {vehicleActivity.deadline}
                  <Divider dashed />
                  <Space>
                    Description:
                    <Popover
                      content={vehicleActivity.description}
                      title="Description"
                      trigger="hover"
                    >
                      <Text italic>Hover here</Text>
                    </Popover>
                  </Space>
                  <Divider dashed />
                </>
              }
              style={{ marginBottom: "16px" }}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <EditVehicleActivityModal
                vehicleActivity={vehicleActivity}
                handleOk={handleOk}
              ></EditVehicleActivityModal>
              <DeleteVehicleActivityModal
                vehicleActivityId={vehicleActivity.id}
                handleOk={handleOk}
              ></DeleteVehicleActivityModal>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}
