import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLNC from "./useLNC";

type ConnectFN = (phrase: string, password: string) => Promise<void>;
type LoginFN = (password: string) => Promise<void>;
type IsPairedFN = () => boolean;
type DisconnectFN = () => void;

export interface Wallet {
  connected: boolean;
  connect: ConnectFN;
  disconnect: DisconnectFN;
  login: LoginFN;
  isPaired: IsPairedFN;
}

const WalletContext = createContext<Wallet>({
  connected: false,
  connect: () => Promise.reject("Context not configured"),
  disconnect: () => Promise.reject("Context not configured"),
  login: () => Promise.reject("Context not configured"),
  isPaired: () => false,
});

export function useWallet() {
  return useContext(WalletContext);
}

export default function WalletProvider(props: PropsWithChildren) {
  const lnc = useLNC();

  const [connected, setConnected] = useState(false);

  const connect = useCallback<ConnectFN>((phrase, password) => {
    return lnc.connect(phrase, password).then(() => {
      setConnected(true);
    });
  }, []);

  const login = useCallback<LoginFN>(password => {
    return lnc.login(password).then(() => {
      setConnected(true);
    });
  }, []);

  const isPaired = useCallback<IsPairedFN>(() => {
    return lnc.client.credentials.isPaired;
  }, []);

  const disconnect = useCallback<DisconnectFN>(() => lnc.disconnect(), []);

  useEffect(() => {
    const disconnect = () => lnc.disconnect();
    window.addEventListener("beforeunload", disconnect);
    return () => {
      window.removeEventListener("beforeunload", disconnect);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ connected, connect, disconnect, login, isPaired }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}
