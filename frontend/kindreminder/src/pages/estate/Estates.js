import { useEffect, useState } from "react";
import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import MenuBar from "../../components/MenuBar.js";
import EstateItem from "./EstateItem";
import AddEstateModal from "./AddEstateModal";

const { Header, Content, Footer } = Layout;

export default function Estates() {
  const [estates, setEstates] = useState([]);

  const getEstates = async () => {
    const data = await fetch("/estate");
    const response = await data.json();
    setEstates(response);
  };

  const handleOk = async () => {
    getEstates();
  };

  useEffect(() => {
    getEstates();
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
          <Title>Manage your estates</Title>
          <AddEstateModal handleOk={handleOk}></AddEstateModal>
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
          {estates.map((estate) => (
            <EstateItem
              key={estate.id}
              estate={estate}
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
