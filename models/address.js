const db = require('../config/config');

const Address = {};

Address.findByUser = (id_user, result) => {
    const sql = `
    SELECT
        CONVERT(A.id, char) AS id,
        A.address,
        A.neighborhood,
        A.lat,
        A.lng,
        CONVERT(A.id_user, char) AS id_user
    FROM
        address AS A
    WHERE
        A.id_user = ?
    `

    db.query(
        sql,
        id_user,
        (err, data) => {
            if (err) {
                console.log('error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

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