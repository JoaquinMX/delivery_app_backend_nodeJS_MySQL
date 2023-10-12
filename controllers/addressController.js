const Address = require('../models/address');

module.exports = {
    
    create(req, res) {
        const address = req.body;

        Address.create(address, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error  con el registro de la dirección',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La dirección se creo correctamente',
                data: `${id}`
            });
        });
    }
}