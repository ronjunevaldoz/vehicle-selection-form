// components/VehicleSelectionForm.tsx
"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from "react";
import LogBookUploader from './LogBookUploader'; // Import the LogBookUploader component


const MODELS = {
  ford: {
    Ranger: ['Raptor', 'Raptor x', 'Wildtrak'],
    Falcon: ['XR6', 'XR6 Turbo', 'XR8'],
    'Falcon Ute': ['XR6', 'XR6 Turbo'],
  },
  bmw: {
    '130d': ['xDrive 26d', 'xDrive 30d'],
    '240i': ['xDrive 30d', 'xDrive 50d'],
    '320e': ['xDrive 75d', 'xDrive 80d', 'xDrive 85d'],
  },
  tesla: {
    'Model 3': ['Performance', 'Long Range', 'Dual Motor'],
  },
};

interface VehicleSelectionFormProps {
  onVehicleSelect: (make: string, model: string, variant: string, file: File | null) => void;
}

const VehicleSelectionForm: React.FC<VehicleSelectionFormProps> = ({
  onVehicleSelect,
}) => {
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null); 
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false); // Added upload form visibility state


  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMake(event.target.value);
    setModel(null);
    setVariant(null);
    setShowUploadForm(false); // Hide upload form when make is changed
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
    setVariant(null);
    setShowUploadForm(false); // Hide upload form when model is changed
  };

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVariant(event.target.value);
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

  useEffect(()=> {
    if (make && model && variant) { 
      setShowUploadForm(true); // Show upload form when all fields are filled up
    } else { 
      setShowUploadForm(false);
    }
  }, [make, model, variant])

  return (
    <div>
      <h2>Vehicle Selection Form</h2>
      <div>
        <label>Select Make:</label>
        <select onChange={handleMakeChange}>
          <option value="">-- Select Make --</option>
          {Object.keys(MODELS).map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      {make && (
        <div>
          <label>Select Model:</label>
          <select onChange={handleModelChange}>
            <option value="">-- Select Model --</option>
            {Object.keys(MODELS[make]).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}
      {model && (
        <div>
          <label>Select Variant:</label>
          <select onChange={handleVariantChange}>
            <option value="">-- Select Variant --</option>
            {MODELS[make][model].map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
      )}

       <div style={{height: 100}}></div>

      {showUploadForm && (
        <LogBookUploader onUpload={(file) => handleUpload(file)} />
      )}

    </div>
    
  );
};

export default VehicleSelectionForm;
