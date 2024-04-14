import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-2 pt-8 md:pt-12 lg:pt-24">
        <h1 className="text-balance text-center text-3xl font-bold leading-tight tracking-tight md:text-6xl lg:leading-[1.1]">
          Cricket Scoring Made Easy
        </h1>
        <span className="max-w-[568px] text-center text-lg text-muted-foreground sm:text-xl">
          Make Every Match More Memorable: Share your scores and relive the
          excitement with friends and teammates.
        </span>

        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button asChild>
            <Link href="/players">Browse</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/soham2k06/cricket-scorer">
              <span className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-foreground pt-1 text-background">
                <Github className="size-4 fill-background" />
              </span>{" "}
              Github
            </Link>
          </Button>
        </div>
      </section>
      <section className="py-8 md:py-12 md:pb-12 lg:py-24 lg:pb-20">
        <h4 className="mb-8 scroll-m-20 text-4xl font-bold tracking-tight">
          Demo Images
        </h4>
        <div className="flex justify-center gap-4 max-md:flex-col">
          <Image
            src="/banner-demo-light.png"
            alt="demo"
            width={360}
            height={100}
            className="rounded-lg max-md:mx-auto max-md:w-11/12"
          />
          <Image
            src="/banner-demo-dark.png"
            alt="demo"
            width={360}
            height={100}
            className="rounded-lg max-md:mx-auto max-md:w-11/12"
          />
        </div>
      </section>
    </>
  );
}

export default page;
