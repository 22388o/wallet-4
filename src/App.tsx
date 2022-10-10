import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import WalletProvider from "./lightning/Wallet";

import AppRouter from "./routing/router";
import Theme from "./theme";

const Background = styled.div`
  background-color: ${props => props.theme.palette.background.default};
  height: 100%;
  width: 100%;
`;

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <Background>
            <Container maxWidth="sm" style={{ height: "inherit", padding: 0 }}>
              <Global
                styles={{
                  "*": { boxSizing: "border-box" },
                  body: {
                    margin: 0,
                    padding: 0,
                    height: "100vh",
                    width: "100vw",
                  },
                }}
              />
              <AppRouter />
            </Container>
          </Background>
        </QueryClientProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
