import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { FormEvent } from "react";

import useInput from "../../hooks/useInput";
import FuseTextLogo from "../../icons/FuseTextLogo";

interface NewConnectionProps {
  onConnect(phrase: string, password: string): void;
}

export default function NewConnection(props: NewConnectionProps) {
  const theme = useTheme();

  const phrase = useInput();
  const password = useInput();
  const confirmation = useInput();

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    props.onConnect(phrase.value, password.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4rem 2rem 2rem 2rem",
        color: theme.palette.text.primary,
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
          Welcome
        </Typography>
        <Typography variant="h5">Let&apos;s connect to your node.</Typography>
        <TextField
          sx={{ marginTop: "4rem", width: "100%" }}
          variant="outlined"
          label="Pairing Phrase"
          value={phrase.value}
          onChange={phrase.onChange}
        />
        <TextField
          sx={{ margin: "1rem 0", width: "100%" }}
          variant="outlined"
          type="password"
          label="Password"
          value={password.value}
          onChange={password.onChange}
        />
        <TextField
          sx={{ width: "100%" }}
          variant="outlined"
          type="password"
          label="Confirm Password"
          value={confirmation.value}
          onChange={confirmation.onChange}
        />
      </Box>
      <Box>
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
