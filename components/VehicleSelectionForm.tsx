import React, { useEffect, useState } from "react";
import LogBookUploader from "./LogBookUploader";
import VehicleSelector from "./VehicleSelector";
import { Row, Col, Card, Form, FormGroup, FormLabel } from "react-bootstrap";
import { useFormik } from "formik"; // Import Formik components
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
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  const initialValues = {
    make: null,
    model: null,
    variant: null,
    file: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const { make, model, variant, file } = values;
      if (make && model && variant && file) {
        onVehicleSelect(make, model, variant, file);
      }
    },
  });

  useEffect(() => {
    const values = formik.values;
    if (values) {
      if (values.make && values.model && values.variant) {
        setShowUploadForm(true);
      } else {
        setShowUploadForm(false);
      }
    }
  }, [formik.values]);

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Col>
            <h2>Vehicle Selection Form</h2>
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <FormLabel>Select Make:</FormLabel>
                <Form.Select
                  name="make"
                  className="form-control"
                  onChange={(e) => {
                    formik.setFieldValue("model", "");
                    formik.handleChange(e);
                  }}
                  value={formik.values.make || ""}
                >
                  <option value="">-- Select Make --</option>
                  {Object.keys(Vehicles).map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
              {formik.values.make && (
                <FormGroup>
                  <FormLabel>Select Model:</FormLabel>
                  <Form.Select
                    name="model"
                    className="form-control"
                    onChange={(e) => {
                      formik.setFieldValue("variant", "");
                      formik.handleChange(e);
                    }}
                    value={formik.values.model || ""}
                  >
                    <option value="">-- Select Model --</option>
                    {Object.keys(Vehicles[formik.values.make]).map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              )}
              {formik.values.model && formik.values.make && (
                <FormGroup>
                  <FormLabel>Select Variant:</FormLabel>
                  <Form.Select
                    name="variant"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.variant || ""}
                  >
                    <option value="">-- Select Variant --</option>
                    {Vehicles[formik.values.make][formik.values.model].map(
                      (variant: string) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      )
                    )}
                  </Form.Select>
                </FormGroup>
              )}
            </Form>
          </Col>
          <Col>
            <VehicleSelector
              onClick1={() => {
                formik.setFieldValue("make", "tesla");
                formik.setFieldValue("model", "Model 3");
                formik.setFieldValue("variant", "Performance");
              }}
              onClick2={() => {
                formik.setFieldValue("make", "bmw");
                formik.setFieldValue("model", "130d");
                formik.setFieldValue("variant", "xDrive 26d");
              }}
            />
          </Col>
          <Col>
            {showUploadForm && (
              <LogBookUploader
                onUpload={(file) => {
                  formik.setFieldValue("file", file);
                  formik.submitForm();
                }}
              />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default VehicleSelectionForm;
