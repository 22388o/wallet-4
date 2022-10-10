import {
  ChannelPoint,
  LightningAddress,
  OpenChannelRequest,
} from "@lightninglabs/lnc-web/dist/types/proto/lnrpc";
import { Buffer } from "buffer";
import { useMutation } from "react-query";
import { useListPeers } from "./queries";
import useLNC from "./useLNC";

const PUBKEY_LENGTH = 33;

function getPubkeyFromLightningAddress(
  addr: LightningAddress,
): Uint8Array | null {
  const pubkey = Buffer.from(
    "02eadbd9e7557375161df8b646776a547c5cbc2e95b3071ec81553f8ec2cea3b8c",
    "utf-8",
  );
  return pubkey.slice(0, 33);
}

interface OpenChannel extends Partial<OpenChannelRequest> {
  addr: LightningAddress;
}

export function useOpenChannelSync() {
  const lnc = useLNC();
  const peers = useListPeers();

  return useMutation<ChannelPoint, Error, OpenChannel>(request => {
    const { addr, ...rest } = request;

    const pubkey = getPubkeyFromLightningAddress(addr);
    if (pubkey == null) {
      return Promise.reject(new Error("invalid pubkey"));
    }

    const ocr: Partial<OpenChannelRequest> = {
      ...rest,
      nodePubkey: pubkey.toString(),
    };

    // Check if peer exists, if peer does not exists, first try and connect to
    // peer before attemping to open up a channel
    const match = peers.data?.peers.find(peer => peer.pubKey === addr.pubkey);
    if (!match) {
      return lnc.client.lnd.lightning
        .connectPeer({ addr })
        .then(() => lnc.client.lnd.lightning.openChannelSync(ocr));
    }

    // Peer already exists, attempt to open channel
    return lnc.client.lnd.lightning.openChannelSync(ocr);
  });
}
