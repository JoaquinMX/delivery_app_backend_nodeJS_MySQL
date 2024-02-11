const db = require("../config/config");

const Order = {};

Order.findByStatus = (status, result) => {
  const sql = `
    SELECT 
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_delivery, char) AS id_delivery,
        O.status,
        O.timestamp,
        JSON_OBJECT(
        'id', CONVERT(A.id, char),
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'dedscription', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address
    INNER JOIN
        orders_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product

    WHERE
        status = ?
    GROUP BY
        O.id;
        `;

  db.query(sql, 
    status, 
    (err, data) => {
        if (err) {
        console.log("error:", err);
        result(err, null);
        } else {
        result(null, data);
        }
  });
};

Order.create = (order, result) => {
  const sql = `
        INSERT INTO
            orders(
                id_client,
                id_address,
                status,
                timestamp,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      order.id_client,
      order.id_address,
      "CREADO", // 0. CREADO 1. PAGADO 2. DESPACHADO. 3. EN CAMINO. 4. ENTREGADO,
      Date.now(),
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
      } else {
        console.log("Id de la nueva orden: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Order;
