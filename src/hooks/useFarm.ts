import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFarmProgram } from './useFarmProgram';
import { BN, Program } from '@coral-xyz/anchor';
import { farmPaymentVault, farmPda, farmRevenueVault, farmSignerPda, farmTokenMintPda, paymentMint } from '@/api/farm/pda';
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { SystemProgram } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor"
import { FarmWithPubkey } from '@/constants/types/solana';
import { useConnection } from '@solana/wallet-adapter-react';
import { farmIdl } from '@/constants/farm-tokenization/idl';
import { FarmTokenization } from '@/constants/farm-tokenization/type';


export const useInitializeFarm = () => {
    const { program, provider } = useFarmProgram();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const initializeFarm = useCallback(async (farmName: string, totalShares: BN, pricePerShare: BN) => {

        if (!program || !provider) throw new Error("program or provider not ready");
        const owner = provider.wallet.publicKey;
        if (!owner) throw new Error("Wallet not connected");
        setError(null);
        setIsLoading(true)


        try {
            const farmPdaAdd = farmPda(owner);
            const paymentMintAdd = paymentMint();
            const farmPaymentVaultAdd = farmPaymentVault(farmPdaAdd);
            const farmRevenueVaultAdd = farmRevenueVault(farmPdaAdd);
            const farmTokenMintPdaAdd = farmTokenMintPda(farmPdaAdd);
            const farmSignerAdd = farmSignerPda(farmPdaAdd)

            const txSig = await program.methods.farmInitialize(farmName, totalShares, pricePerShare)
                .accounts({
                    owner,
                    // @ts-expect-error look into the anchor contract test this problem was there as well.
                    farm: farmPdaAdd,
                    farmTokenMint: farmTokenMintPdaAdd,
                    farmSigner: farmSignerAdd,
                    paymentMint: paymentMintAdd,
                    farmPaymentVault: farmPaymentVaultAdd,
                    farmRevenueVault: farmRevenueVaultAdd,
                    associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY
                })
                .rpc()

            const farmAccount = await program.account.farm.fetch(farmPdaAdd);
            return { txSig, farm: farmPdaAdd, farmAccount }
        } catch (error) {
            setError(error as Error);
            throw error
        } finally {
            setIsLoading(false)
        }

    }, [program, provider]);



    return { initializeFarm, isReady: !!(program && provider), isLoading, error }

}

export const useFarms = () => {
    const { connection } = useConnection();
    const [farms, setFarms] = useState<FarmWithPubkey[]>([]);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | Error>(null);

    // Create a read-only program instance that doesn't require a wallet
    const readOnlyProgram = useMemo(() => {
        if (!connection) return null;
        // A read-only provider only needs the connection — no wallet required
        const readOnlyProvider = { connection } as anchor.Provider;
        return new Program(farmIdl as FarmTokenization, readOnlyProvider) as Program<FarmTokenization>;
    }, [connection]);

    const fetchFarms = useCallback(async () => {
        if (!readOnlyProgram) return;
        setLoading(true);
        setError(null);
        try {
            const accounts = await readOnlyProgram.account.farm.all();
            const parsed: FarmWithPubkey[] = accounts.map((acc) => ({
                publicKey: acc.publicKey.toBase58(),
                ...acc.account,
            }));
            setFarms(parsed);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [readOnlyProgram]);

    useEffect(() => {
        fetchFarms();
    }, [fetchFarms])

    return { farms, loading, error, refetch: fetchFarms };
}