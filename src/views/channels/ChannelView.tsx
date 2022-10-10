import styled from "@emotion/styled";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useListChannels } from "../../lightning/queries";

import Channel from "./Channel";
import { useNavigate } from "react-router-dom";
import Paths from "../../routing/paths";

const View = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 1rem 0.75rem;
`;

const FabContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
`;

const ChannelList = styled.ul`
  padding: 0;
  margin: 0;
`;

export default function ChannelView() {
  const navigate = useNavigate();

  const channels = useListChannels();

  return (
    <View>
      <ChannelList>
        {channels.data?.channels.map(channel => (
          <Channel key={channel.chanId} channel={channel} />
        ))}
      </ChannelList>
      <FabContainer>
        <Fab size="small" color="primary" aria-label="add" onClick={() => navigate(Paths.OpenChannel)}>
          <AddIcon />
        </Fab>
      </FabContainer>
    </View>
  );
}
