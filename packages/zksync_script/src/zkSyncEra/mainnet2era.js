import * as ethers from "ethers";
import * as zksyncWeb3 from "zksync-web3";
import { privates } from '../../libs/getPrivates.js';

const zkSyncProvider = new zksyncWeb3.Provider("https://mainnet.era.zksync.io");

const ethProvider = ethers.getDefaultProvider();

export async function mainnet2era(private_keys, value = 50) {
  for (let i = 0; i < private_keys.length; i++) {
    const zkSyncWallet = new zksyncWeb3.Wallet(
      private_keys[i],
      zkSyncProvider,
      ethProvider
    );
    try {
      const deposit = await zkSyncWallet.deposit({
        token: zksyncWeb3.utils.ETH_ADDRESS,
        amount: ethers.utils.parseEther(
          String((value + Number(Math.random().toFixed(2))) / 1000)
        ),
      });
      console.log("deposit to zkSync result...", deposit);
      const ethereumTxReceipt = await deposit.waitL1Commit();
      console.log("ethereum deposit result...", ethereumTxReceipt);
    } catch (error) {
      console.log("deposit failed...", error);
    }
  }
}

mainnet2era(privates);
