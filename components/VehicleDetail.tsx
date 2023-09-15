"use client"; // This is a client component 👈🏽

import { Container, Card } from "react-bootstrap";

interface VehicleDetailProps {
  vehicle: VehicleData;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle }) => {
  return (
    <Container>
      <Card>
        <h1>Vehicle</h1>
        <div>Make: {vehicle.make}</div>
        <div>Model: {vehicle.model}</div>
        <div>Variant: {vehicle.variant}</div>
        <h1>Log Book</h1>
        <div>File: {vehicle.file}</div>
      </Card>
    </Container>
  );
};
export default VehicleDetail;
