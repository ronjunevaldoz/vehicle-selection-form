 
'use client';

import React from 'react'; 
import VehicleSelectionForm from '../components/VehicleSelectionForm';

const Home: React.FC = () => {
  
  const processData = async (make: string, model: string, variant: string, file: File) => {
    
    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('variant', variant);
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Render the received details or perform other actions as needed
        console.log('Upload response:', data);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading:', error);
    }
  }
  const handleVehicleSelect = (make: string, model: string, variant: string, file: File) => {
    console.log(`Selected Vehicle: Make - ${make}, Model - ${model}, Variant - ${variant}`);
    // You can perform further actions here, such as submitting the form or storing the selection.
    if (make && model && variant && file) {
      processData(make, model, variant, file)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      
    <VehicleSelectionForm onVehicleSelect={handleVehicleSelect} />
      </div>
     
    </div> 
    </main>
  );
};

export default Home;