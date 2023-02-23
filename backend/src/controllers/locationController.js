const speedLimit= 85;
let dataSpeedLimit=[];
let hoy;


const showLocation = (req, res)=>{
  let io = req.app.get('socket')

  console.log(req.body.data[0])
    const {ficha, lat, long, speed} = req.body.data[0];

   if(!ficha || !lat || !long || !speed){
    res.json({warning: 'Please complete all fields'})
   }
 
    
    if(speedLimit > Number(speed)){
      io.sockets.emit('message',req.body.data[0])
      res.json(req.body.data[0]);
      return
    }

    hoy = new Date(Date.now())
    const newData={
      ficha,
      speed,
      date: hoy.toLocaleString()
    }

    dataSpeedLimit=[newData, ...dataSpeedLimit]
    const data={
      message: 'Velocidad limite exedida',
      ficha,
      lat,
      long,
      speed
    }
    
    io.sockets.emit('message',data)
    res.json(data);

}

const showSpeedLimit = (req, res)=>{
    res.json(dataSpeedLimit)
    
}


module.exports={ showLocation, showSpeedLimit}