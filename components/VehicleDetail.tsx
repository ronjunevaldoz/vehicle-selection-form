
const VehicleDetail = (result) => { 
    const data = result.result.body 
    return (
      <div style={{marginTop: 20}}>
        <h1>Vehicle</h1> 
        <div>Make: {data.make}</div>
        <div>Model: {data.model}</div>
        <div>Variant: {data.variant}</div>
        <h1>Log Book</h1> 
        <div>File: { result.result.file}</div>
      </div>
    )
}


export default VehicleDetail