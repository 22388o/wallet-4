import {
  ListChannelsRequest,
  ListChannelsResponse,
  ListPeersResponse,
} from "@lightninglabs/lnc-web/dist/types/proto/lnrpc";
import { useQuery } from "react-query";
import useLNC from "./useLNC";

export const BalanceKeys = {
  all: ["balance"] as const,
  me: () => [...BalanceKeys.all, "me"] as const,
};

type Balance = {
  satoshis: number;
};

export function useGetBalance() {
  const lnc = useLNC();
  return useQuery<Balance, Error>(BalanceKeys.me(), () =>
    lnc.client.lnd.lightning.walletBalance().then(res => {
      return { satoshis: parseInt(res.totalBalance, 10) };
    }),
  );
}

export const ChannelKeys = {
  all: ["channels"] as const,
  list: () => [...ChannelKeys.all, "list"] as const,
};

const DEFAULT_LIST_CHANNEL_QUERY: Partial<ListChannelsRequest> = {
  activeOnly: true,
};

export function useListChannels(request: Partial<ListChannelsRequest> = DEFAULT_LIST_CHANNEL_QUERY) {
  const lnc = useLNC();
  return useQuery<ListChannelsResponse, Error>(ChannelKeys.list(), () =>
    lnc.client.lnd.lightning.listChannels(request),
  );
}

export const PeerKeys = {
  all: ["peers"] as const,
  list: () => [...PeerKeys.all, "list"] as const,
};

export function useListPeers() {
  const lnc = useLNC();
  return useQuery<ListPeersResponse, Error>(PeerKeys.list(), () => lnc.client.lnd.lightning.listPeers());
}
// export const TransactionKeys = {
//   all: ["transactions"] as const
// }

// export function useGetInvoices() {
//   const lnc = useLNC()
//   return useQuery(TransactionKeys.all, () => lnc.client.lnd.lightning.listInvoices())
// }
