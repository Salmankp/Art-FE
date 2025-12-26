import { Container, Service } from 'typedi';

import { OATImplementation } from '../types/OATImplementation';
import { OATSaleImplementation } from '../types/OATSaleImplementation';

/**
 * @returns the contract for OATImplementation
 */
@Service()
export class ContractsInstance {
  /**
   * Original Art Token
   */
  // private _OriginalArtToken: OriginalArtToken | undefined
  // public get OriginalArtToken(): OriginalArtToken {
  // if (this._OriginalArtToken) return this._OriginalArtToken
  // else throw new Error('Token not initialized.')
  // }
  // public set OriginalArtToken(value: OriginalArtToken) {
  // this._OriginalArtToken = value
  // }

  /**
   * OATImplementation
   */
  private _OATImplementation: OATImplementation | undefined;

  public get OATImplementation(): OATImplementation {
    if (this._OATImplementation) return this._OATImplementation;
    throw new Error('Token not initialized.');
  }

  public set OATImplementation(value: OATImplementation) {
    this._OATImplementation = value;
  }

  /**
   * OATSaleImplementation
   */
  private _OATSaleImplementation: OATSaleImplementation | undefined;

  public get OATSaleImplementation(): OATSaleImplementation {
    if (this._OATSaleImplementation) return this._OATSaleImplementation;
    throw new Error('Token not initialized.');
  }

  public set OATSaleImplementation(value: OATSaleImplementation) {
    this._OATSaleImplementation = value;
  }
}

export const getContract = (): ContractsInstance => {
  return Container.get(ContractsInstance);
};
