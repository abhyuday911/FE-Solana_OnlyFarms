"use client";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ArrowUpRight,
  Sprout,
  Layers,
  Coins,
  TrendingUp,
  Wallet,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { CreateFarmModal } from "../ui/modals/create-farm";
import { useFarms } from "@/hooks/useFarm";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import { FarmWithPubkey } from "@/constants/types/solana";

const FARMS_PER_PAGE = 6;

/** Truncate a base58 pubkey for display */
const truncateAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

/** Farm card skeleton for loading state */
const FarmCardSkeleton = () => (
  <Card className="w-full animate-in fade-in duration-500">
    <CardHeader className="items-center">
      <div className="space-y-2 w-full">
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <CardAction>
        <Skeleton className="h-9 w-36 rounded-md" />
      </CardAction>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-9 w-24 rounded-md" />
    </CardFooter>
  </Card>
);

/** A single farm card using real on-chain data */
const FarmCard = ({ farm }: { farm: FarmWithPubkey }) => {
  const totalShares = Number(farm.totalShares);
  const mintedShares = Number(farm.mintedShares);
  const pricePerShare = Number(farm.pricePerShare);
  const availableShares = totalShares - mintedShares;
  const percentageMinted =
    totalShares > 0 ? ((mintedShares / totalShares) * 100).toFixed(1) : "0";

  return (
    <Card className="w-full group hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Sprout className="size-4 text-green-500" />
          </div>
          <div>
            <CardTitle className="text-xl leading-6 tracking-wide">
              {farm.name}
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              {truncateAddress(farm.publicKey)}
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link
              href={`https://explorer.solana.com/address/${farm.publicKey}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorer <ArrowUpRight className="size-3" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Progress bar showing minted percentage */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Shares Minted</span>
            <span className="font-mono">{percentageMinted}%</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(Number(percentageMinted), 100)}%` }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Layers className="size-3.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Shares
              </p>
              <p className="text-sm font-semibold font-mono">
                {totalShares.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Coins className="size-3.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Price / Share
              </p>
              <p className="text-sm font-semibold font-mono">
                {pricePerShare.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <TrendingUp className="size-3.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Minted
              </p>
              <p className="text-sm font-semibold font-mono">
                {mintedShares.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Wallet className="size-3.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Available
              </p>
              <p className="text-sm font-semibold font-mono">
                {availableShares.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <span className="font-mono">
          Owner: {truncateAddress(farm.owner.toString())}
        </span>
        <span className="text-green-500/80 font-medium">
          {availableShares > 0 ? "Open" : "Sold Out"}
        </span>
      </CardFooter>
    </Card>
  );
};

/** Generate page numbers to show (max 5 visible pages with ellipsis) */
const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis-start");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis-end");
    pages.push(totalPages);
  }
  return pages;
};

const Main = () => {
  const { farms, loading, error, refetch } = useFarms();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(farms.length / FARMS_PER_PAGE));

  // Reset page if current page exceeds total after data changes
  const safePage = Math.min(currentPage, totalPages);

  const paginatedFarms = useMemo(() => {
    const start = (safePage - 1) * FARMS_PER_PAGE;
    return farms.slice(start, start + FARMS_PER_PAGE);
  }, [farms, safePage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full h-full p-8 pb-4 space-y-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">We Got OnlyFarms!</h1>
          {!loading && farms.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {farms.length} farm{farms.length !== 1 ? "s" : ""} on-chain
              <span className="mx-2 text-muted-foreground/40">·</span>
              Page {safePage} of {totalPages}
            </p>
          )}
        </div>
        <CreateFarmModal onSuccess={refetch} />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Error State */}
        {error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-20">
            <div className="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="size-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Failed to load farms
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mt-1">
                {error.message || "Something went wrong while fetching on-chain farm data. Make sure your wallet is connected."}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RefreshCw className="size-4" /> Retry
            </Button>
          </div>
        )}

        {/* Loading State - Skeleton Grid */}
        {loading && !error && (
          <div className="w-full py-4 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: FARMS_PER_PAGE }).map((_, id) => (
              <FarmCardSkeleton key={id} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && farms.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-20">
            <div className="size-20 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Sprout className="size-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">No farms yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Be the first to tokenize a farm on-chain. Click &quot;Create
                Your Own Farm&quot; to get started.
              </p>
            </div>
          </div>
        )}

        {/* Farm Cards Grid */}
        {!loading && !error && farms.length > 0 && (
          <>
            <div className="w-full py-4 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {paginatedFarms.map((farm) => (
                <FarmCard key={farm.publicKey} farm={farm} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="pt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (safePage > 1) handlePageChange(safePage - 1);
                      }}
                      className={safePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {getPageNumbers(safePage, totalPages).map((page) =>
                    typeof page === "string" ? (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={safePage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (safePage < totalPages) handlePageChange(safePage + 1);
                      }}
                      className={safePage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}

        {/* Inline loading indicator when data is present but refreshing */}
        {loading && farms.length > 0 && (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            <span>Refreshing farm data…</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
