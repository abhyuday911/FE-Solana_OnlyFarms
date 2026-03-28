import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group";
import { LandPlot, Layers, Wallet } from "lucide-react";
import { Spinner } from "../spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useInitializeFarm } from "@/hooks/useFarm";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { toast } from 'sonner';

interface Farm {
  farmName: string;
  totalShares: number;
  pricePerShare: number;
}
const InitializeFarmFormSchema = yup.object({
  farmName: yup.string().min(1).required(),
  totalShares: yup.number().positive().required(),
  pricePerShare: yup.number().positive().required(),
});

interface farmAccount {
  owner: PublicKey;
  name: string;
  farmTokenMint: PublicKey;
  paymentMint: PublicKey;
  farmPaymentVault: PublicKey;
  farmRevenueVault: PublicKey;
  totalShares: BN;
  mintedShares: BN;
  pricePerShare: BN;
  accountRevenuePerShare: BN;
  bump: number;
  signerBump: number;
}

export const CreateFarmModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { initializeFarm, isLoading, isReady } = useInitializeFarm();
  const [open, setOpen] = useState(false);
  const [farm, setFarm] = useState<PublicKey | null>(null);
  const [farmAccount, setFarmAccount] = useState<farmAccount | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(InitializeFarmFormSchema) });

  const onSubmit = async (data: Farm) => {
    try {
      const { farmAccount, farm } = await initializeFarm(
        data.farmName,
        new BN(data.totalShares),
        new BN(data.pricePerShare)
      );
      toast.info(farmAccount.name + " created!");
      setFarm(farm);
      setFarmAccount(farmAccount);
      console.log(farmAccount);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("farm not created, something went wrong.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Your Own Farm!</Button>
      </DialogTrigger>
      <DialogContent className="w-md bg-green-900/10 rounded-lg backdrop-blur-3xl">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InputGroup className="h-10 gap-2">
            <InputGroupInput
              placeholder="Farm Name"
              {...register("farmName")}
              className="md:text-xl h-12"
            />
            <InputGroupAddon>
              <LandPlot />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className="h-10 gap-2">
            <InputGroupInput
              type="number"
              placeholder="Total Shares"
              {...register("totalShares")}
              className="md:text-xl h-12"
            />
            <InputGroupAddon>
              <Layers />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="h-10 gap-2">
            <InputGroupInput
              type="number"
              placeholder="Price Per Share"
              {...register("pricePerShare")}
              className="md:text-xl h-12"
            />
            <InputGroupAddon>
              <Wallet />
            </InputGroupAddon>
          </InputGroup>
          <Button
            disabled={!isReady || isLoading}
            className="w-full mt-2 font-bold"
            size={"lg"}
          >
            {isLoading ? (
              <>
                <Spinner className="size-6" /> Creating Farm...
              </>
            ) : (
              "Create Farm"
            )}
          </Button>
          <p className="text-xs text-red-400/80">
            {errors.farmName?.message ||
              errors.totalShares?.message ||
              errors.pricePerShare?.message}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
