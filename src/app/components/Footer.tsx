import React from "react";
import {cn} from "@/lib/utils";

export function Footer({className}: {className?: string}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full py-6 px-4 bg-[var(--third-green)] dark:bg-neutral-900",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-neutral-200 dark:text-neutral-400">
            © {currentYear} TestBet. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="/terms"
              className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-400"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-400"
            >
              Privacy Policy
            </a>
            <a
              href="/contact"
              className="text-sm text-neutral-200 hover:text-primary dark:text-neutral-400"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
