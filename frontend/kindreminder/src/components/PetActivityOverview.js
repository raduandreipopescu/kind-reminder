import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PetActivityOverview = () => {
  const [petActivities, setPetActivities] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/pet-activities");
  };

  const getPetActivities = async () => {
    const data = await fetch("/pet-activity/deadline/");
    const response = await data.json();
    setPetActivities(response);
  };

  useEffect(() => {
    getPetActivities();
  }, []);

  return (
    <Card
      hoverable
      className="pet-activity-card"
      style={{ marginBottom: "20px" }}
      onClick={handleCardClick}
    >
      {petActivities.map((petActivity) => (
        <Card.Grid key={petActivity.id} >
          <Card.Meta
            title={<h3>{petActivity.pet.name}</h3>}
            hoverable
            description={
              <>
                Name: {petActivity.activity.name}
                <Divider dashed />
                Deadline: {petActivity.deadline}
              </>
            }
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

export default PetActivityOverview;
