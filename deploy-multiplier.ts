import { DefaultProvider, sha256, bsv, toByteString } from 'scrypt-ts'
import { Multiplier } from './src/contracts/multiplier'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 2

    await signer.login('sales@timechainlabs.io', 'string')
    await Multiplier.loadArtifact()

    const product = BigInt(6)
    const instance = new Multiplier(product)
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'smart contract deployed : https://whatsonchain.com/tx/' + deployTx.id
    )
    
    const factor1 = 2
    const factor2 = 3
    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock(factor1, factor2)
    console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
