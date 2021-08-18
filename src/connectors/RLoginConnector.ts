import RLogin from '@rsksmart/rlogin'
import { Web3ReactProvider } from '@rsksmart/rlogin-web3-react-connector'
import WalletConnectProvider from '@walletconnect/web3-provider'

interface RLoginReponse {
  provider: any
  disconnect: () => void
}

export const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co'
        }
      }
    }
  },
  supportedChains: [30, 31]
})

export const connectRLogin = () =>
  rLogin
    .connect()
    .then((response: RLoginReponse) => new Web3ReactProvider(response))
    .catch(console.log) // user closed modal is the only reason this is called
