const Joi=require("joi");
const documentsTypes=require('../utils/documentValid')

const reservationScheme=Joi.object({

    identificacion: Joi.string().min(9).required().custom((value, helper)=>{

        if(!value.includes('-')){
            return helper.message("verifique la informacion e intente de nuevo")
        }

        const typeDocument = value.split('-');
        if (!documentsTypes.includes(typeDocument[0])) {
          return helper.message('Verifique la información e intente de nuevo');
        }
        if (typeDocument[1].length < 7) {
            return helper.message('Verifique la información e intente de nuevo');
          }
    
          return value;
    }),

    project: Joi.string().regex(/^[a-zA-Z0-9-_ñÑ]+$/),

    informacion: Joi.object().required()



});

module.exports = {
    reservationScheme,
};
