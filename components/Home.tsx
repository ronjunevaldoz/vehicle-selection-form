"use client";

import React, { useEffect, useState } from "react";
import VehicleSelectionForm from "../components/VehicleSelectionForm";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

type HandleVehicleSelect = (
  make: string,
  model: string,
  variant: string,
  file: File | null
) => void;

const processDataUpload = async (
  make: string,
  model: string,
  variant: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("make", make);
  formData.append("model", model);
  formData.append("variant", variant);
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      // Render the received details or perform other actions as needed
      console.log("Upload response:", jsonResponse);
      return jsonResponse;
    } else {
      console.error("Upload failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error uploading:", error);
    return null;
  }
};

const Home: React.FC = () => {
  const [result, setResult] = useState<VehicleData | null>(null);
  const router = useRouter();

  const handleVehicleSelect: HandleVehicleSelect = async (
    make,
    model,
    variant,
    file
  ) => {
    console.log(
      `Selected Vehicle: Make - ${make}, Model - ${model}, Variant - ${variant}`
    );
    // You can perform further actions here, such as submitting the form or storing the selection.
    if (make && model && variant && file) {
      const jsonResponse = await processDataUpload(make, model, variant, file);
      const data = jsonResponse.body;
      const txtFile = jsonResponse.file;
      const vehicleData: VehicleData = {
        make: data.make || null,
        model: data.model || null,
        variant: data.variant || null,
        file: txtFile || null,
      };

      setResult(vehicleData);
    }
  };

  useEffect(() => {
    if (result) {
      const queryParams = {
        make: result.make,
        model: result.model,
        variant: result.variant,
        file: result.file,
      };

      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join("&");
      const pathname = "/upload";
      router.push(pathname + "?" + queryString);
    }
  }, [result]);

  return (
    <Container>
      <VehicleSelectionForm onVehicleSelect={handleVehicleSelect} />
    </Container>
  );
};

export default Home;
