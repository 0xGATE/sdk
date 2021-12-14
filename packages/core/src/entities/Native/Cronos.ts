import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'
import { WETH9 } from '../../constants/tokens'
import invariant from 'tiny-invariant'

/**
 * Cronos is the main usage of a 'native' currency, i.e. for Cronoseum mainnet and all testnets
 */
export class Cronos extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'CRO', 'Cronos')
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Cronos } = {}

  public static onChain(chainId: number): Cronos {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Cronos(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
