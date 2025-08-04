"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Anomaly } from "@/ai/flows/detect-anomalies";

type AlertsContextType = {
  alerts: Anomaly[];
  setAlerts: (alerts: Anomaly[]) => void;
};

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Anomaly[]>([]);

  const value = { alerts, setAlerts };

  return (
    <AlertsContext.Provider value={value}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
}
