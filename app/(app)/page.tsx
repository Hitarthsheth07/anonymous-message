import { Button } from "@/components/ui/button";
// import { buttonVariants } from "./ui/button";
import { HeroCards } from "@/components/HeroCard";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home () {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Mystry :)
            </span>{" "}
            anonymous
          </h1>{" "}
          message for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              feedback
            </span>{" "}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Send an anonymous message to anyone, all you need is their Username
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-">
          <Link href='/send-message'>
            <Button className="w-full md:w-1/3">Send message</Button>
          </Link>
          <Link href='/sign-in' className="ml-4">
            <Button className="w-full md:w-1/3" variant={"outline"}>Demo</Button>
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
