import {
    SmartContract,
    assert,
    method,
    prop,
} from 'scrypt-ts'

export class Multiplier extends SmartContract {
    @prop()
    product: bigint

    constructor(prod: bigint) {
        super(...arguments)
        this.product = prod
    }

    @method()
    public unlock(factor1: bigint, factor2: bigint) {
        assert(factor1 * factor2 == this.product, 'incorrect multiplication')
    }
}
