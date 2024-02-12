const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");
module.exports = {
  findByStatus(req, res) {
    const status = req.params.status;

    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },

  findByDeliveryAndStatus(req, res) {
    const id_delivery = req.params.id_delivery;
    const status = req.params.status;

    Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const order = req.body;

    Order.create(order, async (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al crear la orden",
          error: err,
        });
      }

      for (const product of order.products) {
        await OrderHasProducts.create(
          id,
          product.id,
          product.quantity,
          (err, id_data) => {
            if (err) {
              return res.status(501).json({
                success: false,
                message: "Hubo un error al registrar los productos en la orden",
                error: err,
              });
            }
          }
        );
      }
      return res.status(201).json({
        success: true,
        message: "La orden se creo correctamente",
        data: `${id}`,
      });
    });
  },

  updateStatus(req, res) {
    const order = req.body;
    Order.updateStatus(
      order.id,
      order.id_delivery,
      order.status,
      (err, id_order) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "Hubo un error al momento de actualizar la orden",
            error: err,
          });
        }
        return res.status(201).json({
          success: true,
          message: "La orden se ha actualizado correctamente",
          data: `${id_order}`,
        });
      }
    );
  },
};
