const ajvInstance = require('../middleware/ajv.service');

const schema ={
    type:'object',
    properties:{
        Name:{type:'string'},
        Email:{type:'string',format:'email'},
        usertype: { type: 'string', enum: ['admin', 'user'] },
        Password:{type:'string'}
    },
    required:['Name','Email','usertype','Password'],
    additionalProperties:false,
};

module.exports = ajvInstance.compile(schema)