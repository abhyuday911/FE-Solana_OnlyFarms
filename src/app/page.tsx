import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-san ">
      <main className="px-10 h-screen pt-20 flex flex-col items-center justify-center">
        <Button variant={"secondary"} asChild>
          <Link href={"/farms"}>Go to farms page</Link>
        </Button>
      </main>
    </div>
  );
}
