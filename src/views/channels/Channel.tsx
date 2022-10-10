import styled from "@emotion/styled";
import { Channel } from "@lightninglabs/lnc-web/dist/types/proto/lnrpc";
import { Chip, Paper, Typography } from "@mui/material";

const ListItem = styled.li`
  margin-bottom: 1rem;
`;

const Container = styled(Paper)`
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
`;

const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Middle = styled.div`
  margin: 1rem 0;
`;

const Bottom = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const BalanceContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.25rem;
`;

type BalanceProps = {
  sats: number;
};

function Balance(props: BalanceProps) {
  return (
    <BalanceContainer>
      <Typography variant="subtitle2" color="white">
        {props.sats}
      </Typography>
      <Typography variant="subtitle2" color="white">
        sats
      </Typography>
    </BalanceContainer>
  );
}

const Bar = styled.div`
  align-items: center;
  display: flex;
  height: 1rem;
`;

const Remote = styled.div`
  background-color: ${props => props.theme.palette.error.main};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 100%;
  width: 50%;
`;

const Local = styled.div`
  background-color: ${props => props.theme.palette.success.main};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 100%;
  width: 50%;
`;

type LiquidityProps = {
  local: number;
  remote: number;
};

function Liquidity(props: LiquidityProps) {
  const total = props.local + props.remote;

  return (
    <Bar>
      <Local style={{ width: `${(props.local / total) * 100}%` }} />
      <Remote style={{ width: `${(props.remote / total) * 100}%` }} />
    </Bar>
  );
}

interface ChannelProps {
  channel?: Channel;
}

export default function Channel(props: ChannelProps) {
  return (
    <ListItem>
      <Container>
        <Top>
          <Typography color="white">Channel Name</Typography>
          <Chip size="small" label="ACTIVE" color="success" />
        </Top>
        <Middle>
          <Liquidity local={1000000} remote={500000} />
        </Middle>
        <Bottom>
          <Balance sats={1000000} />
          <Balance sats={500000} />
        </Bottom>
      </Container>
    </ListItem>
  );
}
