const AWS = require('aws-sdk');
const config = require('../config/dynamodb');
const isDev = process.env.NODE_ENV !== 'production';

const listar=(req,res)=>{

  if (isDev) {
    AWS.config.update(config.aws_local_config);
  } else {
    AWS.config.update(config.aws_remote_config);
  }
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: config.aws_table_name
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Error: Server error',
        err
      });
    } else {
      const { Items } = data;
      res.status(200).json({
        success: true,
        message: 'reservations',
        reservations: Items
      });
    }
  });

}

module.exports = {
  listar
}