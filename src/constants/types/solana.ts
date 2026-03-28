import { IdlAccounts } from '@coral-xyz/anchor';
import { FarmTokenization } from '../farm-tokenization/type';

export type FarmAccount = IdlAccounts<FarmTokenization>["farm"];

export type FarmWithPubkey = {
  publicKey: string;
} & FarmAccount;