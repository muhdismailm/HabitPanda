"use client";

import { useState, useEffect } from "react";
import { PandaState } from "@/types/panda";
import { getStorage, setStorage } from "@/lib/storage";
import { INITIAL_PANDA_STATE } from "@/lib/constants";

export function usePanda() {
  const [panda, setPanda] = useState<PandaState>(INITIAL_PANDA_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getStorage<PandaState>("panda", INITIAL_PANDA_STATE);
    setPanda(stored);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setStorage("panda", panda);
    }
  }, [panda, isLoaded]);

  const addRewards = (bamboo: number, xp: number) => {
    setPanda((prev) => ({
      ...prev,
      bamboo: prev.bamboo + bamboo,
      totalXP: prev.totalXP + xp,
    }));
  };

  const buyItem = (itemId: string, cost: number) => {
    let success = false;
    setPanda((prev) => {
      if (prev.bamboo >= cost && !prev.inventory.includes(itemId)) {
        success = true;
        return {
          ...prev,
          bamboo: prev.bamboo - cost,
          inventory: [...prev.inventory, itemId],
        };
      }
      return prev;
    });
    return success;
  };

  const toggleEquip = (itemId: string) => {
    setPanda((prev) => {
      if (!prev.inventory.includes(itemId)) return prev;

      const isEquipped = prev.equipped.includes(itemId);
      return {
        ...prev,
        equipped: isEquipped
          ? prev.equipped.filter((id) => id !== itemId)
          : [...prev.equipped, itemId],
      };
    });
  };

  return {
    panda,
    isLoaded,
    addRewards,
    buyItem,
    toggleEquip,
  };
}
