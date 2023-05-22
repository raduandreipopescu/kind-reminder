import { useEffect, useState } from "react";
import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import MenuBar from "../../components/MenuBar.js";
import VehicleItem from "./VehicleItem";
import AddVehicleModal from "./AddVehicleModal";

const { Header, Content, Footer } = Layout;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = async () => {
    const data = await fetch("/vehicle");
    const response = await data.json();
    setVehicles(response);
  };

  const handleOk = async () => {
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
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
          <Title>Manage your vehicles</Title>
          <AddVehicleModal handleOk={handleOk}></AddVehicleModal>
          <Title />
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
            <VehicleItem
              key={vehicle.id}
              vehicle={vehicle}
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
