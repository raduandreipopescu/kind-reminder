import { useEffect, useState } from "react";
import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import MenuBar from "../../components/MenuBar.js";
import EstateActivityItem from "./EstateActivityItem";

const { Header, Content, Footer } = Layout;

export default function EstateActivities() {
  const [estates, setEstates] = useState([]);
  const [activities, setActivities] = useState([]);

  const getEstates = async () => {
    const data = await fetch("/estate");
    const response = await data.json();
    setEstates(response);
  };

  const getActivities = async () => {
    const data = await fetch("/activity/category/estate");
    const response = await data.json();
    setActivities(response);
  };

  const handleOk = async () => {
    getEstates();
  };

  useEffect(() => {
    getEstates();
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
          <Title>Manage your estates schedule</Title>
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
            <EstateActivityItem
              key={estate.id}
              estate={estate}
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
