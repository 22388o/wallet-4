import { Navigate, Outlet } from "react-router-dom";

import { useWallet } from "../lightning/Wallet";
import Paths from "./paths";

export default function GreatWallOfSatoshi() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return <Navigate to={Paths.Connect} />;
  }

  return <Outlet />;
}
