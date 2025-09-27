import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/Spotlight";
import { NavbarDemo } from "./navbar";

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
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          VetroQuizz <br /> test your knowledge.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            Welcome to VetroQuizz, where curiosity meets challenge. Here, you get to explore, think, and compete all while having fun. Our quizzes are designed to make you think twice, learn something new.
        </p>
      </div>
    </div>
  );
}
