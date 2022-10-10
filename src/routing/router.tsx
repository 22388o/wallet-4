import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

import Paths from "./paths";
import HomeView from "../views/home/HomeView";
import GreatWallOfSatoshi from "./GreatWallOfSatoshi";

import { useCallback, useState } from "react";
import NavMenu from "./NavMenu";
import ChannelView from "../views/channels/ChannelView";
import OpenChannelView from "../views/channels/OpenChannelView";
import ConnectGateway from "../views/connect/ConnectGateway";

const View = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  padding: 0.5rem;
`;

function Layout() {
  const [open, setOpen] = useState(false);

  const onOpenMenu = useCallback(() => setOpen(true), []);

  const onCloseMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <View>
        {/* <Header>
          <IconButton onClick={onOpenMenu}>
            <MenuIcon />
          </IconButton>
        </Header> */}
        <Outlet />
      </View>
      <NavMenu open={open} onOpen={onOpenMenu} onClose={onCloseMenu} />
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GreatWallOfSatoshi />}>
          <Route element={<Layout />}>
            <Route path={Paths.Home} element={<HomeView />} />
            <Route path={Paths.Channels} element={<ChannelView />} />
            <Route path={Paths.OpenChannel} element={<OpenChannelView />} />
          </Route>
        </Route>
        <Route path={Paths.Connect} element={<ConnectGateway />} />
      </Routes>
    </BrowserRouter>
  );
}
