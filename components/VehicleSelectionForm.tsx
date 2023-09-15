// components/VehicleSelectionForm.tsx
"use client"; // This is a client component 👈🏽

import React, { useEffect, useRef, useState } from "react";
import LogBookUploader from "./LogBookUploader"; // Import the LogBookUploader component
import VehicleSelector from "./VehicleSelector";
import {
  Row,
  Col,
  FormGroup,
  FormLabel,
  Form,
  FormControl,
  Card,
} from "react-bootstrap";
import Vehicles from "@/model/Vehicles";
 
interface VehicleSelectionFormProps {
  onVehicleSelect: (
    make: string,
    model: string,
    variant: string,
    file: File | null
  ) => void;
}

const VehicleSelectionForm: React.FC<VehicleSelectionFormProps> = ({
  onVehicleSelect,
}) => {
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false); // Added upload form visibility state

  const makeRef = useRef<HTMLSelectElement | null>(null);
  const modelRef = useRef<HTMLSelectElement | null>(null);
  const variantRef = useRef<HTMLSelectElement | null>(null);

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel(null);
    setVariant(null);
    setShowUploadForm(false); // Hide upload form when make is changed
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setVariant(null);
    setShowUploadForm(false); // Hide upload form when model is changed
  };

  const handleVariantChange = (value: string) => {
    setVariant(value);
    if (make && model && variant) {
      onVehicleSelect(make, model, variant, null);
    }
  };

  const handleUpload = (file: File) => {
    if (make && model && variant && file) {
      onVehicleSelect(make, model, variant, file);
      // You can also handle file upload here, e.g., send it to a server.
    }
  };

  useEffect(() => {
    if (make && model && variant) {
      setShowUploadForm(true); // Show upload form when all fields are filled up
    } else {
      setShowUploadForm(false);
    }
  }, [make, model, variant]);

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Col>
            <h2>Vehicle Selection Form</h2>
            <Form>
              <FormGroup>
                <FormLabel>Select Make:</FormLabel>
                <Form.Select
                  as="select"
                  onChange={(event) => {
                    handleMakeChange(event.target.value);
                  }}
                  value={make || ""}
                >
                  <option value="">-- Select Make --</option>
                  {Object.keys(Vehicles).map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
              {make && (
                <FormGroup>
                  <FormLabel>Select Model:</FormLabel>
                  <Form.Select
                    as="select"
                    onChange={(event) => {
                      handleModelChange(event.target.value);
                    }}
                    value={model || ""}
                  >
                    <option value="">-- Select Model --</option>
                    {Object.keys(Vehicles[make]).map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              )}
              {model && (
                <FormGroup>
                  <FormLabel>Select Variant:</FormLabel>
                  <Form.Select
                    as="select"
                    onChange={(event) => {
                      handleVariantChange(event.target.value);
                    }}
                    value={variant || ""}
                  >
                    <option value="">-- Select Variant --</option>
                    {Vehicles[make || ""][model].map((variant : string) => (
                      <option key={variant} value={variant}>
                        {variant}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              )}
            </Form>
          </Col>
          <Col>
            <VehicleSelector
              onClick1={() => {
                handleMakeChange("tesla");
                handleModelChange("Model 3");
                handleVariantChange("Performance");
                if (makeRef.current) {
                  makeRef.current.value = "tesla";
                }
                if (modelRef.current) {
                  modelRef.current.value = "Model 3";
                }
                if (variantRef.current) {
                  variantRef.current.value = "Performance";
                }
              }}
              onClick2={() => {
                handleMakeChange("bmw");
                handleModelChange("130d");
                handleVariantChange("xDrive 26d");
                if (makeRef.current) {
                  makeRef.current.value = "bmw";
                }
                if (modelRef.current) {
                  modelRef.current.value = "130d";
                }
                if (variantRef.current) {
                  variantRef.current.value = "xDrive 26d";
                }
              }}
            />
          </Col>
          <Col>
            {showUploadForm && (
              <LogBookUploader onUpload={(file) => handleUpload(file)} />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default VehicleSelectionForm;
