"use client"; 
import { Landing } from "@/components/landing-page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const pass = () => {
    router.push("/quizz");
  };

  return (
    <div>
      <Landing />
    </div>
  );
}
