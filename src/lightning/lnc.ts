import LightningNodeConnect from "@lightninglabs/lnc-web";

class LNC {
  client = new LightningNodeConnect({
    namespace: "fusewallet",
  });

  connect(phrase: string, password: string) {
    this.client.credentials.pairingPhrase = phrase;
    this.client.credentials.password = password;
    return this.client.connect().catch(err => console.log(err));
  }

  login(password: string) {
    this.client.credentials.password = password;
    return this.client.connect();
  }

  disconnect() {
    this.client.disconnect();
  }

  preload() {
    return this.client.preload();
  }
}

export default LNC;
