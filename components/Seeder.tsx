"use client";

import { useEffect } from "react";
import { runSeed } from "@/lib/seed";

export function Seeder() {
  useEffect(() => {
    runSeed();
  }, []);

  return null;
}
