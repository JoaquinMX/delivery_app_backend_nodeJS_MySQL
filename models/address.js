const db = require('../config/config');

const Address = {};

Address.create = (address, result) => {
    const sql = `
        INSERT INTO
            address(
                address,
                neighborhood,
                lat,
                lng,
                id_user,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            address.address,
            address.neighborhood,
            address.lat,
            address.lng,
            address.id_user,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva direccion: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = Address;