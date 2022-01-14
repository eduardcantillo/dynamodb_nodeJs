const AWS = require('aws-sdk');
const config = require('../config/dynamodb');
const isDev = process.env.NODE_ENV !== 'production';

const obtenerPorId=(req,res)=>{

    if (isDev) {
        AWS.config.update(config.aws_local_config);
      } else {
        AWS.config.update(config.aws_remote_config);
      }

    const {typeDocument, number} = req.body;
    const identificacion= `${typeDocument}-${number}`
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name,
        KeyConditionExpression: 'identificacion = :i',
        ExpressionAttributeValues: {
          ':i': identificacion
        }
      };

      docClient.query(params, function(err, data) {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Error: Server error',
            err
          });
        } else {
          
          const { Items } = data;
          let reservations;
          if(Items){
             reservations=Items[0];
          }
          
          res.status(200).json({
            success: true,
            message: 'reservas',
            reservations
          });
        }
      });
   
}

module.exports={
    obtenerPorId
}