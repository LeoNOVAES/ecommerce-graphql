const knex = require("../../config/database");

const resolver = {
    Query: {
        getCategories: () => { return [] }
    },
    Mutation: {
        addCategory: async (_, args, req) => {
            if(req.role !== 'ADMIN' || !req.isAuth) throw new Error('access denied');
            
            const category = await store(args.category);
            return category;
        }
    }
}

const indexById = async (id) => {
    try {
        const category = await knex('categories').where({ id });
        return category[0];
    } catch ($e) {
        throw new Error($e);
    }
}

const store = async ({ name }) => {
    try {
        const id =  await knex('categories').insert({
            name
        }, 'id');

        return indexById(id[0]);
    } catch ($e) {
        console.log($e);
        throw new Error('User already exists');
    }
}

module.exports = resolver;

