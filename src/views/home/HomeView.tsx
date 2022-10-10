import styled from "@emotion/styled";

import Balance from "./Balance";
import WalletActions from "./WalletActions";

const View = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-top: 25%;
`;

const Spacer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Bar = styled.div`
  width: 100%;
  height: 4px;
  border: 1px solid rgba(23, 24, 26, 1);
  background-color: rgba(30, 32, 31, 1);

  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export default function HomeView() {
  return (
    <View>
      <Balance />
      {/* <Spacer />
      <WalletActions />
      <Bar /> */}
    </View>
  );
}
