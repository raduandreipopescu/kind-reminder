import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faBuilding, faCar, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { useState } from "react";

const items = [
  {
    label: (
      <a href="/" style={{ color: "royalblue" }}>
        <b>Kind Reminder</b>
      </a>
    ),
    key: "1",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
  },
  {
    label: "Vehicles",
    key: "2",
    icon: <FontAwesomeIcon icon={faCar} />,
    children: [
      {
        label: <a href="/vehicle-activities">View vehicle schedule</a>,
        key: "setting:21",
      },
      {
        label: <a href="/vehicles">Manage vehicles</a>,
        key: "setting:22",
      },
    ],
  },
  {
    label: "Estates",
    key: "3",
    icon: <FontAwesomeIcon icon={faBuilding} />,
    children: [
      {
        label: <a href="/estate-activities">View estate schedule</a>,
        key: "setting:31",
      },
      {
        label: <a href="/estates">Manage estates</a>,
        key: "setting:32",
      },
    ],
  },
  {
    label: "Pets",
    key: "4",
    icon: <FontAwesomeIcon icon={faDog} />,
    children: [
      {
        label: <a href="/pet-activities">View pet schedule</a>,
        key: "setting:41",
      },
      {
        label: <a href="/pets">Manage pets</a>,
        key: "setting:42",
      },
    ],
  },
];

const MenuBar = () => {
  const [current, setCurrent] = useState("1");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default MenuBar;
