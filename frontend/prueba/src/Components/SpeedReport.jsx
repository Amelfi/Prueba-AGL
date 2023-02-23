import React from 'react'
import Table from 'react-bootstrap/Table';

const SpeedReport = ({info}) => {
    
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Ficha</th>
          <th>Velocidad</th>
          <th>Fecha</th>
          
        </tr>
      </thead>
      <tbody>
        {info.map((e, index)=> (
        <tr key={index}>
          <td>{e.ficha}</td>
          <td>{e.speed}</td>
          <td>{e.date}</td>
         
        </tr>
))}
      </tbody>
    </Table>
    </div>
  )
}

export default SpeedReport