import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EstateActivityOverview = () => {
  const [estateActivities, setEstateActivities] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/estate-activities");
  };

  const getEstateActivities = async () => {
    const data = await fetch("/estate-activity/deadline/");
    const response = await data.json();
    setEstateActivities(response);
  };

  useEffect(() => {
    getEstateActivities();
  }, []);

  return (
    <Card
      hoverable
      className="estate-activity-card"
      style={{ marginBottom: "20px" }}
      onClick={handleCardClick}
    >
      {estateActivities.map((estateActivity) => (
        <Card.Grid key={estateActivity.id} >
          <Card.Meta
            title={<h3>{estateActivity.estate.type} / {estateActivity.estate.town} </h3>}
            hoverable
            description={
              <>
                Name: {estateActivity.activity.name}
                <Divider dashed />
                Deadline: {estateActivity.deadline}
              </>
            }
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

export default EstateActivityOverview;
