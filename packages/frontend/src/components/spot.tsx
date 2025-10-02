import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/Spotlight";
import { NavbarDemo } from "./navbar";
import { LayoutTextFlip } from "./layout-text-flip";
import { motion } from "motion/react";

export function SpotlightPreview() {
  return (
      <div className="relative flex flex-col h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
        <nav className="fixed top-2.5 left-0 right-0 z-50" >
            <NavbarDemo />
        </nav>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="VertoQuizz test your"
          words={["knowledge.", "mind.", "skills.", "wisdom."]
          }
        />
      </motion.div>
      <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            Welcome to VertoQuizz, where curiosity meets challenge. Here, you get to explore, think, and compete all while having fun. Our quizzes are designed to make you think twice, learn something new.
        </p>
    </div>
    </div>
  );
}
