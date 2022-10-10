import styled from "@emotion/styled";
import { Box, SwipeableDrawer, Typography, useTheme } from "@mui/material";
import { NavLink as RRNavLink } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import ShareIcon from "@mui/icons-material/Share";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Paths from "./paths";
import { CSSProperties } from "react";

type LinkStyleFN = (props: { isActive: boolean }) => React.CSSProperties;

const Header = styled.div`
  border-bottom: 1px solid black;
  padding: 0.75rem 0.5rem;
  text-align: center;
`;

const NavLink = styled(RRNavLink)`
  align-items: center;
  color: ${props => props.theme.palette.text.secondary};
  display: flex;
  gap: 1rem;
  text-decoration: none;
  padding: 0.75rem 1rem;
`;

interface NavMenuProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

type LinkProps = {
  label: string;
  to: string;
  icon: JSX.Element;
  onClick(): void;
};

function Link(props: LinkProps) {
  const theme = useTheme();

  const activeStyle: CSSProperties = {
    color: theme.palette.primary.main,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  };

  const style: LinkStyleFN = ({ isActive }) => (isActive ? activeStyle : {});

  return (
    <NavLink to={props.to} style={style} onClick={props.onClick}>
      {props.icon}
      <Typography>{props.label}</Typography>
    </NavLink>
  );
}

export default function NavMenu(props: NavMenuProps) {
  return (
    <SwipeableDrawer anchor="left" open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
      <Box sx={{ width: 200 }}>
        <Header>
          <Typography variant="button">FUSE</Typography>
        </Header>
        <Link label="Wallet" icon={<WalletIcon />} to={Paths.Home} onClick={props.onClose} />
        <Link label="Channels" icon={<ShareIcon />} to={Paths.Channels} onClick={props.onClose} />
        <Link label="Node" icon={<ElectricBoltIcon />} to={Paths.Channels} onClick={props.onClose} />
      </Box>
    </SwipeableDrawer>
  );
}
