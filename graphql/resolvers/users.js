const config = require('../../config');
const jwt = require("jsonwebtoken");
const knex = require("../../config/database");
const bcrypt = require('bcrypt');

const resolver = {
    Query: {
        getUser: () => { return [] }
    },
    Mutation: {
       addUser: async (_, args) => {
           console.log('args', args)
           const user = await store(args.user);
           return user;
        },
       login: (root, args) => auth(args.login)
    }
}

const indexById = async (id) => {
    try {
        const user = await knex('users').select('id', 'last_name', 'first_name', 'email').where({ id });
        return user[0];
    } catch ($e) {
        throw new Error($e);
    }
}

const store = async ({ first_name, last_name, email, password }) => {
    try {
        password = await bcrypt.hashSync(password, 15);
        const id =  await knex('users').insert({
            first_name,
            last_name,
            role: 'USER',
            email,
            password
        }, 'id');

        return indexById(id[0]);
    } catch ($e) {
        console.log($e);
        throw new Error('User already exists');
    }
}

const auth = async ({ email, password }) => {
    try {
        let user = await knex('users').where({ email: email });
        user = user[0];
        
        if(!user) throw new Error('User not found!');
        
        const isEqual = await bcrypt.compare(password, user.password);

        if(!isEqual) throw new Error('User not found!');

        const token = jwt.sign({
            id: user.id, 
            role: user.role
        }, config.jwtSecret, {
            expiresIn:86400
        });
        
        return { token };
    } catch ($e) {
        throw new Error('User not found!');
    }
}

module.exports = resolver;