import ControllerCHP from "components/Controllers/CHP";
import ControllerCHST from "components/Controllers/CHST";
import ControllerSystem from "components/Controllers/ControllerSystem";
import ControllerKD from "components/Controllers/KD";
import ControllerMHDT from "components/Controllers/MHDT";
import ControllerTT from "components/Controllers/TT";
import ControllerVCNV from "components/Controllers/VCNV";
import ControllerVD from "components/Controllers/VD";

export const ROUTE_CONTROLLER = {
  path: "/controller",
  component: ControllerSystem,
};

export const ROUTE_CONTROLLER_SCOREBOARD = {
  path: "/controller/scoreboard",
  component: ControllerMHDT,
};

export const ROUTE_ROUNDS = [
  {
    path: "/KD",
    id: "KD",
    name: "Tien phat che nhan",
    component: ControllerKD,
  },
  {
    path: "/VCNV",
    id: "VCNV",
    name: "Cong thanh chien",
    component: ControllerVCNV,
  },
  {
    path: "/TT",
    id: "TT",
    name: "Toc chien toc thang",
    component: ControllerTT,
  },
  {
    path: "/VD",
    id: "VD",
    name: "Ma dao thanh cong",
    component: ControllerVD,
  },
  {
    path: "/CHST",
    id: "CHST",
    name: "Cau hoi so truong",
    component: ControllerCHST,
  },
  {
    path: "/CHP",
    id: "CHP",
    name: "Cau hoi phu",
    component: ControllerCHP,
  },
];
