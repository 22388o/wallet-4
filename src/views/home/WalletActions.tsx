import styled from "@emotion/styled";
import { Button, Typography, useTheme } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { MouseEventHandler } from "react";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const IconButton = styled(Button)`
  height: 3rem;
  width: 3rem;
  min-width: unset;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

type ActionButtonProps = {
  label: string;
  icon: JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ActionButton(props: ActionButtonProps) {
  const theme = useTheme();
  return (
    <ButtonContainer>
      <IconButton variant="contained" style={{ borderRadius: "100%" }} onClick={props.onClick}>
        {props.icon}
      </IconButton>
      <Typography variant="caption" color={theme.palette.text.secondary}>
        {props.label}
      </Typography>
    </ButtonContainer>
  );
}

export default function WalletActions() {
  return (
    <Container>
      <ActionButton label="Send" icon={<ArrowUpwardIcon />} onClick={() => {}} />
      <ActionButton label="Scan" icon={<CropFreeIcon />} onClick={() => {}} />
      <ActionButton label="Receive" icon={<ArrowDownwardIcon />} onClick={() => {}} />
    </Container>
  );
}
