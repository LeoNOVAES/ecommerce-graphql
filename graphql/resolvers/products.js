const path = require("path");
const fs = require("fs");
const knex = require("../../config/database");


const resolver = {
    Query: {
        getProduct: (_ , args) => {
            return [];
        }
    },
    Mutation: {
        addProduct: async (_ , args, req) => {
            // if(req.role != 'ADMIN' && !req.isAuth) throw new Error('access denied');

            const idProduct = await store(args.product);

            args.files.map(async (file, index) => {
                if(index === 0) {
                    const cover = await uploadImage(idProduct, file);
                    await update({ id: idProduct,  cover });
                    return;
                }

                await uploadImage(idProduct, file);
            });

            return indexById(idProduct);
        },
        addImage: async (_ , { id, file }, req) => {
            if(req.role != 'ADMIN' && !req.isAuth) throw new Error('access denied');

            const url = uploadImage(id, file);
            return { url };
        }
    }
}

const uploadImage = async (id, file) => {
    try {
        const { filename, createReadStream } = await file;  
        const pathName = path.join(path.resolve(), `/public/products/images/${filename}`);
        const stream = createReadStream();
        await stream.pipe(fs.createWriteStream(pathName));
        const url = `http://localhost:3000/products/images/${filename}`;

        await knex('images').insert({
            path: url,
            product_id: id
        });

        return url;
    } catch ($e) {
        throw new Error($e);
    }
}

const indexById = async (id) => {
    try {
        const product = await knex('products')
            .select(
                'categories.name as category_name',
                'categories.id as category_id',
                'products.*'
            )
            .join('categories', 'categories.id', 'products.category_id')
            .where('products.id', id)
            .first()

        product.category = {
            id: product.category_id,
            name: product.category_name
        }

        product.images = await knex('images')
            .select('images.path')
            .join('products', 'products.id', 'images.product_id')
            .where('images.product_id', id)
        
        return product;
    } catch ($e) {
        throw new Error($e);
    }
}

const store = async ({ name, price, category_id, cover }) => {
    try {
        const id =  await knex('products').insert({
            name,
            price,
            category_id,
            cover
        }, 'id');

        return id[0];
    } catch ($e) {
        console.log($e);
        throw new Error('Store not works!');
    }
}

const update = async ({ id, name, price, category_id, cover }) => {
    try {
        console.log(cover)
        await knex('products')
        .update({
            name,
            price,
            category_id,
            cover
        })
        .where({ id });

    } catch ($e) {
        console.log($e);
        throw new Error('Update nots works!');
    }
}

module.exports = resolver;