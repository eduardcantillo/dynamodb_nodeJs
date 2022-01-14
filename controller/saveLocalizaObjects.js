const AWS = require('aws-sdk');
const config = require('../config/dynamodb');
const { request, response } = require("express");
const {reservationScheme} = require('../models/localizaObject')


const isDev = process.env.NODE_ENV !== 'production';


const buscar =  (identificacion)=>{
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: config.aws_table_name,
    KeyConditionExpression: 'identificacion = :i',
    ExpressionAttributeValues: {
      ':i': identificacion
    }
  };

  const reserva = new Promise((resolve,reject)=> docClient.query(params, function(err, data) {
    if (err) {
     reject(err)
    } else {
      const { Items } = data;
      
      if(Items){
         resolve(Items[0]);
      }
    }
   
  })); 

   return reserva;
    
}

const   guardarReserva=async (req=request, res=response)=>{
    let reservation;
     try{

        reservation=await reservationScheme.validateAsync(req.body);
        if (isDev) {
            AWS.config.update(config.aws_local_config);
        } else {
            AWS.config.update(config.aws_remote_config);
        }
        const docClient = new AWS.DynamoDB.DocumentClient();
        
        let reservations=await buscar(req.body.identificacion);
        let info;
        if(reservations){
          if(reservations.informacion){
            info=[...reservations.informacion,req.body.informacion];
          }else{
            info=[req.body.informacion];
          }
        }else{
          info=[req.body.informacion]
          
        }

         
        const params = {
          TableName: config.aws_table_name,
          Item: {
            identificacion: req.body.identificacion,
            project: req.body.project,
            informacion: info
          }
        };
          
          docClient.put(params, function(err, data) {
            if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error: Server error',
                err
              });
            } else {
              console.log(data)
              return res.status(201).json({
                success: true,
                message: 'reserva agregada',
                reservation: params.Item
              });
            }
          });


     }catch(exception){
        return res.status(200).json({
            exception
        });
     }
}

module.exports={
    guardarReserva
}