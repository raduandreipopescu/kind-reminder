import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import MenuBar from "../../components/MenuBar.js";
import PetActivityItem from "./PetActivityItem";

const { Header, Content, Footer } = Layout;

export default function PetActivities() {
  const [pets, setPets] = useState([]);
  const [activities, setActivities] = useState([]);

  const getPets = async () => {
    const data = await fetch("/pet");
    const response = await data.json();
    setPets(response);
  };

  const getActivities = async () => {
    const data = await fetch("/activity/category/pet");
    const response = await data.json();
    setActivities(response);
  };

  const handleOk = async () => {
    getPets();
  };

  useEffect(() => {
    getPets();
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
          <Title>Manage your pets schedule</Title>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pets.map((pet) => (
            <PetActivityItem
              key={pet.id}
              pet={pet}
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
