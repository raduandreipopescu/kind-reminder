import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import MenuBar from "../../components/MenuBar.js";
import AddPetModal from "./AddPetModal";
import PetItem from "./PetItem";

const { Header, Content, Footer } = Layout;

export default function Pets() {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    const data = await fetch("/pet");
    const response = await data.json();
    setPets(response);
  };

  const handleOk = async () => {
    getPets();
  };

  useEffect(() => {
    getPets();
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
          <Title>Manage your pets</Title>
          <AddPetModal handleOk={handleOk}></AddPetModal>
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
          {pets.map((pet) => (
            <PetItem key={pet.id} pet={pet} handleOk={handleOk} />
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
