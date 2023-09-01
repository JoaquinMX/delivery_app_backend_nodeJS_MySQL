const Category = require('../models/category');

module.exports = {

    async getAll(req, res) {
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },
    
    create(req, res) {
        const category = req.body;

        Category.create(category, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar la categoria',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se creo correctamente',
                data: `${id}`
            });
        });
    }
}