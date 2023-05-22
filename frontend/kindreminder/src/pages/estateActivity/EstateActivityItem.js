import { useEffect, useState } from "react";
import { Card, Col, Divider, Popover, Row, Space, Typography } from "antd";
import AddEstateActivityModal from "./AddEstateActivityModal";
import DeleteEstateActivityModal from "./DeleteEstateActivityModal";
import EditEstateActivityModal from "./EditEstateActivityModal";

export default function EstateActivityItem(props) {
  const { Text } = Typography;
  const [estateActivities, setEstateActivities] = useState([]);

  const getEstateActivities = async () => {
    const data = await fetch("/estate-activity/estateId/" + props.estate.id);
    const response = await data.json();
    setEstateActivities(response);
  };

  const handleOk = async () => {
    getEstateActivities();
  };

  useEffect(() => {
    getEstateActivities();
  }, []);

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="estate-activity-card"
        style={{
          width: 1000,
          marginBottom: "8px",
        }}
        title={
          <Row align="middle">
            <Col flex="auto">
              <h3>{props.estate.type} / {props.estate.town} schedule</h3>
              {props.estate.type}: {props.estate.country} {props.estate.town} {props.estate.street}
            </Col>
            <Col flex="100px">
              <AddEstateActivityModal
                handleOk={handleOk}
                estate={props.estate}
                activities={props.activities}
              ></AddEstateActivityModal>
            </Col>
          </Row>
        }
      >
        {estateActivities.map((estateActivity) => (
          <Card.Grid key={estateActivity.id}>
            <Card.Meta
              description={
                <>
                  Name: {estateActivity.activity.name}
                  <Divider dashed />
                  Deadline: {estateActivity.deadline}
                  <Divider dashed />
                  <Space>
                    Description:
                    <Popover
                      content={estateActivity.description}
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
              <EditEstateActivityModal
                estateActivity={estateActivity}
                handleOk={handleOk}
              ></EditEstateActivityModal>
              <DeleteEstateActivityModal
                estateActivityId={estateActivity.id}
                handleOk={handleOk}
              ></DeleteEstateActivityModal>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}
