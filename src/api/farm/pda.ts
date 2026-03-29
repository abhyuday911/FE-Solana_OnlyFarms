import { FarmProgramId } from '@/constants/farm-tokenization/ProgromId'
import { PublicKey } from '@solana/web3.js'

export const farmPda = (farmOwnerPubKey: PublicKey, name: string) => {
    const [farmPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("farm"), farmOwnerPubKey.toBuffer(), Buffer.from(name)], 
        FarmProgramId
    );
    return farmPda;
}

export const farmSignerPda = (farmPda: PublicKey) => {
    const [farmSignerPda] = PublicKey.findProgramAddressSync([Buffer.from("farm"), farmPda.toBuffer()], FarmProgramId);
    return farmSignerPda;
}

export const farmTokenMintPda = (farmPda: PublicKey) => {
    const [farmTokenMintPda] = PublicKey.findProgramAddressSync([Buffer.from("farm_token_mint"), farmPda.toBuffer()], FarmProgramId);
    return farmTokenMintPda;
}

export const farmPaymentVault = (farmPda: PublicKey) => {
    const [farmPaymentVault] = PublicKey.findProgramAddressSync([Buffer.from("payment-vault"), farmPda.toBuffer()], FarmProgramId);
    return farmPaymentVault;
}

export const farmRevenueVault = (farmPda: PublicKey) => {
    const [farmRevenueVault] = PublicKey.findProgramAddressSync([Buffer.from("revenue-vault"), farmPda.toBuffer()], FarmProgramId);
    return farmRevenueVault;
}

export const paymentMint = () => {
    return new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr")
}
