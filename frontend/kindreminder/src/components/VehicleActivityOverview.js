import { Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VehicleActivityOverview = () => {
  const [vehicleActivities, setVehicleActivities] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/vehicle-activities");
  };

  const getVehicleActivities = async () => {
    const data = await fetch("/vehicle-activity/deadline/");
    const response = await data.json();
    setVehicleActivities(response);
  };

  useEffect(() => {
    getVehicleActivities();
  }, []);

  return (
    <Card
      hoverable
      className="vehicle-activity-card"
      style={{ marginBottom: "20px" }}
      onClick={handleCardClick}
    >
      {vehicleActivities.map((vehicleActivity) => (
        <Card.Grid key={vehicleActivity.id} >
          <Card.Meta
            title={<h3>{vehicleActivity.vehicle.plateNumber}</h3>}
            hoverable
            description={
              <>
                Name: {vehicleActivity.activity.name}
                <Divider dashed />
                Deadline: {vehicleActivity.deadline}
              </>
            }
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

export default VehicleActivityOverview;
