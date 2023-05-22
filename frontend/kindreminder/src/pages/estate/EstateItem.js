import { Card } from "antd";
import DeleteEstateModal from "./DeleteEstateModal";
import EditEstateModal from "./EditEstateModal";

export default function EstateItem(props) {
  const handleOk = async () => {
    props.handleOk();
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <Card
        hoverable
        className="estate-card"
        style={{
          width: 500,
          marginBottom: "8px",
        }}
        title={<h3>Estate: {props.estate.type}</h3>}
      >
        <Card.Meta
          title={
            <>
              {props.estate.country} {props.estate.town}
            </>
          }
          description={props.estate.street}
          style={{ marginBottom: "16px" }}
        />
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EditEstateModal
          estate={props.estate}
          handleOk={handleOk}
        ></EditEstateModal>
        <DeleteEstateModal
          estate={props.estate}
          handleOk={handleOk}
        ></DeleteEstateModal>
      </div>
    </div>
  );
}
