import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AsyncTypography from "../../components/AsyncTypography";

import { useGetBalance } from "../../lightning/queries";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Balance() {
  const theme = useTheme();
  const balance = useGetBalance();

  return (
    <Container>
      <Typography variant="button" color={theme.palette.background.paper}>
        Current Wallet Value
      </Typography>
      <AsyncTypography
        variant="h4"
        align="center"
        color={theme.palette.text.primary}
        loading={balance.isLoading}
        style={{ minWidth: "75%" }}
      >
        {balance.data?.satoshis} sats
      </AsyncTypography>
      <AsyncTypography
        variant="caption"
        align="center"
        color={theme.palette.info.light}
        loading={true}
        style={{ minWidth: "50%" }}
      >
        10.00 USD
      </AsyncTypography>
    </Container>
  );
}
