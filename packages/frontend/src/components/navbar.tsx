"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavbarDemo() {
    const router = useRouter();

  const navItems = [
    {
      name: "Docs",
      link: "https://chambray-lilac-47a.notion.site/Submission-for-ASE-Challenge-Verto-27e72c389f1980afb3b2d8bbf5af0ed6",
    },
    {
      name: "Code",
      link: "https://github.com/aadltya/vertoQuizz",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const startQuizz = () => {
    router.push("/quizz");
  }

  return (
    <div className="max-w-2/3 mx-auto">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton 
                onClick={() => {
                    startQuizz();
                }}
                variant="primary"
                >Start Quiz
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                    setIsMobileMenuOpen(false)
                    startQuizz();
                }}
                variant="primary"
                className="w-full"
              >
                Start Quiz
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}