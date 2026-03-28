import React from "react";
import { WalletMultiButton } from "../providers/solana-provider";
import { Button } from "../ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex fixed w-screen justify-between px-8 h-20 items-center backdrop-blur-sm">
      <div className="w-20">
        <Link href={"/"} className='text-2xl'>Home</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center w-sm justify-end">
        <Button className="h-12" variant={"secondary"}>
          SOALNA DEVNET
        </Button>
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default NavBar;
