

import React, {useEffect, useState} from 'react'; 
import VehicleSelectionForm from '../components/VehicleSelectionForm';
import { redirect } from 'next/navigation'
import { Container } from 'react-bootstrap';
import VehicleDetail from './VehicleDetail';

const Home: React.FC = () => {
  const [result, setResult] = useState(null)
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
        setResult(data)
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

  useEffect(() => {
    if(result) {
        // redirect("/upload") 
    }
  }, [result])

  return (
    <Container >
         <VehicleSelectionForm onVehicleSelect={handleVehicleSelect} />

        {result && <VehicleDetail result={result}/>}
    </Container>
  );
};

export default Home