"use client";
// `app/upload/page.tsx` is the UI for the `/upload` URL

import VehicleDetail from "@/components/VehicleDetail";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams()!;
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const variant = searchParams.get("variant");
  const file = searchParams.get("file");

  const vehicleData: VehicleData = {
    make: make || null,
    model: model || null,
    variant: variant || null,
    file: file || null,
  };

  return <VehicleDetail vehicle={vehicleData} />;
}
