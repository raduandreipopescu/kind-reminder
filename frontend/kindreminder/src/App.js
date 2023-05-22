import { Divider, Layout } from "antd";
import EstateActivityOverview from "./components/EstateActivityOverview.js";
import MenuBar from "./components/MenuBar.js";
import PetActivityOverview from "./components/PetActivityOverview.js";
import VehicleActivityOverview from "./components/VehicleActivityOverview.js";

const { Header, Content, Footer } = Layout;

const App = () => {
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
        <div className="site-layout-content">
          <Divider orientation="left" style={{ color: "blue" }}>
            Vehicle schedule for the next 30 days
          </Divider>
          <p>
            <VehicleActivityOverview />
          </p>
          <Divider orientation="left" style={{ color: "blue" }}>
            Estate schedule for the next 30 days
          </Divider>
          <p>
            <EstateActivityOverview />
          </p>
          <Divider orientation="left" style={{ color: "blue" }}>
            Pet schedule for the next 30 days
          </Divider>
          <p>
            <PetActivityOverview />
          </p>
          <Divider />
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
};

export default App;
