import { Card, Col, Divider, Popover, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import AddPetActivityModal from "./AddPetActivityModal";
import DeletePetActivityModal from "./DeletePetActivityModal";
import EditPetActivityModal from "./EditPetActivityModal";

export default function PetActivityItem(props) {
  const { Text } = Typography;
  const [petActivities, setPetActivities] = useState([]);

  const getPetActivities = async () => {
    const data = await fetch("/pet-activity/petId/" + props.pet.id);
    const response = await data.json();
    setPetActivities(response);
  };

  const handleOk = async () => {
    getPetActivities();
  };

  useEffect(() => {
    getPetActivities();
  }, []);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="pet-activity-card"
        style={{
          width: 1000,
          marginBottom: "8px",
        }}
        title={
          <Row align="middle">
            <Col flex="auto">
              <h3>{props.pet.name}'s schedule</h3>
              {props.pet.type}
            </Col>
            <Col flex="100px">
              <AddPetActivityModal
                handleOk={handleOk}
                pet={props.pet}
                activities={props.activities}
              ></AddPetActivityModal>
            </Col>
          </Row>
        }
      >
        {petActivities.map((petActivity) => (
          <Card.Grid key={petActivity.id}>
            <Card.Meta
              description={
                <>
                  Name: {petActivity.activity.name}
                  <Divider dashed />
                  Deadline: {petActivity.deadline}
                  <Divider dashed />
                  <Space>
                    Description:
                    <Popover
                      content={petActivity.description}
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
              <EditPetActivityModal
                petActivity={petActivity}
                handleOk={handleOk}
              ></EditPetActivityModal>
              <DeletePetActivityModal
                petActivityId={petActivity.id}
                handleOk={handleOk}
              ></DeletePetActivityModal>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}
