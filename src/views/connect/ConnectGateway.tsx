import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import useLNC from "../../lightning/useLNC";
import { useWallet } from "../../lightning/Wallet";
import Paths from "../../routing/paths";
import ExistingConnection from "./ExistingConnection";
import NewConnection from "./NewConnection";

enum View {
  Existing = "existing-connection",
  New = "new-connection",
}

type LoadingStateProps = {
  loading: boolean;
};

const LoadingState = (props: LoadingStateProps) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
    open={props.loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default function ConnectGateway() {
  const lnc = useLNC();
  const wallet = useWallet();

  const [view, setView] = useState(
    wallet.isPaired() ? View.Existing : View.New,
  );

  const [loading, setLoading] = useState(false);

  const onNewConnection = () => {
    setView(View.New);
  };

  const onClickConnect = (phrase: string, password: string) => {
    setLoading(true);
    wallet.connect(phrase, password);
  };

  const onClickLogin = (password: string) => {
    setLoading(true);
    wallet.login(password);
  };

  useEffect(() => {
    lnc.preload();
  }, []);

  if (wallet.connected) {
    return <Navigate to={Paths.Home} />;
  }

  if (view === View.Existing) {
    return (
      <>
        <LoadingState loading={loading} />
        <ExistingConnection
          onNewConnection={onNewConnection}
          onConnect={onClickLogin}
        />
      </>
    );
  }

  return (
    <>
      <LoadingState loading={loading} />
      <NewConnection onConnect={onClickConnect} />
    </>
  );
}
