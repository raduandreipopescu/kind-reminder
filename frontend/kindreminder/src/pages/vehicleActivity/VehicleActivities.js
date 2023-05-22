import { useEffect, useState } from "react";
import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import MenuBar from "../../components/MenuBar.js";
import VehicleActivityItem from "./VehicleActivityItem";

const { Header, Content, Footer } = Layout;

export default function VehicleActivities() {
  const [vehicles, setVehicles] = useState([]);
  const [activities, setActivities] = useState([]);

  const getVehicles = async () => {
    const data = await fetch("/vehicle");
    const response = await data.json();
    setVehicles(response);
  };

  const getActivities = async () => {
    const data = await fetch("/activity/category/vehicle");
    const response = await data.json();
    setActivities(response);
  };

  const handleOk = async () => {
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
    getActivities();
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <MenuBar />
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          <Title>Manage your vehicles schedule</Title>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {vehicles.map((vehicle) => (
            <VehicleActivityItem
              key={vehicle.id}
              vehicle={vehicle}
              activities={activities}
              handleOk={handleOk}
            />
          ))}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Kind Reminder 2023 Created with Ant Design
      </Footer>
    </Layout>
  );
}
