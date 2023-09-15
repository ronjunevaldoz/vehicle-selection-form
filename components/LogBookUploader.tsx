// components/LogBookUploader.tsx
import React, { useState } from 'react';

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
      <h3>Log Book Uploader</h3>
      <div>
        <label>Select File:</label>
        <input type="file" accept=".pdf,.jpg,.png,.txt" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default LogBookUploader;
