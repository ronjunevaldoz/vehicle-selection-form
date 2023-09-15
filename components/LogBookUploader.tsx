// components/LogBookUploader.tsx
import React, { useState } from 'react';
import { Form, Col, Button, ButtonGroup, Card } from "react-bootstrap";

interface LogBookUploaderProps {
  onUpload: (file: File) => void;
}

const LogBookUploader: React.FC<LogBookUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      // You can also add further handling logic here, e.g., sending the file to a server.
    }
  };

  return (
    <div>
      <h2>Log Book Uploader</h2> 
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select File</Form.Label>
        <Form.Control type="file" accept=".txt" onChange={handleFileChange}/>
      </Form.Group>
      <div>
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  );
};

export default LogBookUploader;
