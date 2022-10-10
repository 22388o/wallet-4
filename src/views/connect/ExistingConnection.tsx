import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import useInput from "../../hooks/useInput";
import FuseTextLogo from "../../icons/FuseTextLogo";

interface ExistingConnectionProps {
  onNewConnection(): void;
  onConnect(password: string): void;
}

export default function ExistingConnection(props: ExistingConnectionProps) {
  const password = useInput();

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    props.onConnect(password.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4rem 2rem 2rem 2rem",
        color: theme => theme.palette.text.primary,
        height: "100%",
      }}
      onSubmit={onSubmit}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <FuseTextLogo height="60px" width="160px" />
        </Box>
        <Typography variant="h4" gutterBottom>
          Welcome back!
        </Typography>
        <Typography variant="h5">Let&apos;s connect to your node.</Typography>
        <TextField
          sx={{ margin: "4rem 0", width: "100%" }}
          variant="outlined"
          type="password"
          label="Password"
          value={password.value}
          onChange={password.onChange}
        />
      </Box>

      <Box>
        <Button
          variant="text"
          sx={{ fontSize: "0.65rem", width: "100%" }}
          size="small"
          onClick={props.onNewConnection}
        >
          Connect using a different pairing phrase
        </Button>
        <Button
          sx={{ marginTop: "1.25rem", width: "100%" }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Connect
        </Button>
      </Box>
    </Box>
  );
}
