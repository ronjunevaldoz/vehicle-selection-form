import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface VehicleSelectorProps {
  onClick1: () => void;
  onClick2: () => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onClick1, onClick2 }) => {
  return (
    <>
      <h2>Select a Vehicle</h2>
      <ButtonGroup vertical>
        <Button onClick={onClick1}>Tesla Model 3 Performance</Button>
        <Button onClick={onClick2}>BMW 130d xDrive 26d</Button>
      </ButtonGroup>
    </>
  );
};

export default VehicleSelector;
