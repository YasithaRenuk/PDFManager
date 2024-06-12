const ajvInstance = require('../middleware/ajv.service');

const schema ={
    type:'object',
    properties:{
        Name:{type:'string'},
        Email:{type:'string',format:'email'},
        Password:{type:'string'}
    },
    required:['Name','Email','Password'],
    additionalProperties:false,
};

module.exports = ajvInstance.compile(schema)