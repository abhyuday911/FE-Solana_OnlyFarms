"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CreateFarmModal } from "../ui/modals/create-farm";

const Main = () => {
  return (
    <div className="w-full h-full p-8 pb-4 space-y-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">We Got OnlyFarms!</h1>
        <CreateFarmModal />
      </div>
      <div className="overflow-scroll w-full py-4 flex-1 bg-linear-to-b grid grid-cols-3 justify-items-center items-center gap-8">
        {Array(50)
          .fill("")
          .map((e, id) => {
            return (
              <Card className="w-full" key={id}>
                <CardHeader className="items-center">
                  <CardTitle className="text-2xl leading-6 tracking-wide">
                    {"farmAccount"}
                  </CardTitle>
                  <CardAction>
                    <Button asChild variant={"secondary"}>
                      <Link
                        href={`https://explorer.solana.com/address/${e}?cluster=devnet`}
                        target="blank"
                      >
                        Solana Explorer <ArrowUpRight />
                      </Link>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p>Total Shares: {Number(2000).toLocaleString()}</p>
                  <p>Price Per Share: ${Number(30).toLocaleString()}</p>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
