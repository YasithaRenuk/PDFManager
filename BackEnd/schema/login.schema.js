const ajvInstance = require('../middleware/ajv.service');

const schema ={
    type:'object',
    properties:{
        Email:{type:'string',format:'email'},
        Password:{type:'string'}
    },
    required:['Email','Password'],
    additionalProperties:false,
};

module.exports = ajvInstance.compile(schema)