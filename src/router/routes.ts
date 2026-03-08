import Home from "@/pages/Home";
import T0004_Timer from "@/pages/tools/T0004_Timer";
import T0005_CalendarPage from "@/pages/tools/T0005_CalendarPage";
import T0006_QrTool from "@/pages/tools/T0006_QrTool";
import G0004_3DBallsGame from "@/pages/games/G0004_3DBallsGame";
import AntennaPageFF14 from "@/pages/antenna/AntennaPageFF14";
import NotFoound from "@/pages/NotFound.tsx";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/tools/T0004_Timer",
    component: T0004_Timer,
  },
  {
    path: "/tools/T0005_CalendarPage",
    component: T0005_CalendarPage,
  },
  {
    path: "/tools/T0006_QrTool",
    component: T0006_QrTool,
  },
  {
    path: "/games/G0004_3DBallsGame",
    component: G0004_3DBallsGame,
  },
  {
    path: "/antenna/AntennaPageFF14",
    component: AntennaPageFF14,
  },
  {
    path: "*",
    component: NotFoound,
  },
]