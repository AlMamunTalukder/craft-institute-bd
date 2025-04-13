"use client";

import React from "react";
import { ReactNode, useEffect, useState } from "react";
import Loading from "@/app/loading";

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient ? children : <Loading />}</>;
};

export default Hydrate;
