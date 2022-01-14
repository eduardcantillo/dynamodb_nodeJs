module.exports = {
    aws_table_name: 'localiza-reserva',
    aws_local_config: {
      region: 'local',
      endpoint: 'http://localhost:8000'
    },
    aws_remote_config: {
      region:'us-east-1',
      accessKeyId: process.env.ACCES_KEY_ID,
      secretAccessKey:process.env.SECRET_ACCESS_KEY

    }
  };