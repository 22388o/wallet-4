import styled from "@emotion/styled";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { FormEvent } from "react";
import useInput from "../../hooks/useInput";
import { useOpenChannelSync } from "../../lightning/mutations";
import { LightningAddress } from "@lightninglabs/lnc-web/dist/types/proto/lnrpc";
import { Buffer } from "buffer";

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0 auto;
  width: 100%;
  max-width: 520px;
  padding: 1rem;
`;

const FormRow = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;

function parseNodeAddress(node: string): LightningAddress | null {
  const split = node.split("@");

  if (split.length !== 2) {
    return null;
  }

  return { pubkey: split[0], host: split[1] };
}

export default function OpenChannelView() {
  const theme = useTheme();

  const openChannel = useOpenChannelSync();

  const node = useInput();
  const size = useInput();
  const push = useInput();
  const fee = useInput();
  const blocks = useInput("10");

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const addr = parseNodeAddress(node.value);

    if (!addr) {
      alert("Invalid Address");
      return;
    }

    openChannel.mutate({
      addr,
      localFundingAmount: size.value,
      pushSat: push.value || undefined,
      satPerVbyte: fee.value || undefined,
      targetConf: parseInt(blocks.value, 10),
    });
  };

  if (openChannel.isSuccess) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: theme.palette.success.main }}
          gutterBottom={true}
        >
          Channel Request Completed
        </Typography>
        <CheckCircleOutlineIcon color="success" fontSize="large" />
        <Typography variant="body1">
          {openChannel.data.fundingTxidBytes}
        </Typography>
        <Typography variant="body1">
          {openChannel.data.fundingTxidStr}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Form component="form" onSubmit={onSubmit}>
        <FormRow>
          <TextField
            sx={{ flex: "2 1" }}
            label="Node (pubkey@host)"
            variant="filled"
            value={node.value}
            onChange={node.onChange}
          />
          <IconButton size="large">
            <QrCodeScannerIcon />
          </IconButton>
        </FormRow>
        <TextField
          label="Channel Size"
          variant="filled"
          value={size.value}
          onChange={size.onChange}
        />
        <TextField
          label="Push Amount"
          variant="filled"
          value={push.value}
          onChange={push.onChange}
        />
        <TextField
          label="Channel Fee Rate"
          variant="filled"
          value={fee.value}
          onChange={fee.onChange}
        />
        <TextField
          label="Confirmation Target"
          variant="filled"
          value={blocks.value}
          onChange={blocks.onChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Open Channel
        </Button>
      </Form>
      <Backdrop sx={{ color: "#fff" }} open={openChannel.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
