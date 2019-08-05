import * as Yup from 'yup';
import ProductVariation from '../models/ProductVariation';

require('dotenv').config();

class ProductVariationController {
  async index(req, res) {
    const productVariations = await ProductVariation.findAll({
      order: ['sku'],
      attributes: [
        'id',
        'name',
        'sku',
        'available',
        'variation_name',
        'price',
        'price_from',
        'weight',
        'order',
        'product_id',
      ],
    });

    return res.json(productVariations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      sku: Yup.string().required(),
      available: Yup.string().required(),
      variation_name: Yup.string().required(),
      price: Yup.number().required(),
      price_from: Yup.number().required(),
      weight: Yup.number().required(),
      order: Yup.number().required(),
      product_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      sku,
      available,
      variation_name,
      price,
      price_from,
      weight,
      order,
      product_id,
    } = req.body;

    const productVariation = await ProductVariation.create({
      name,
      sku,
      available,
      variation_name,
      price,
      price_from,
      weight,
      order,
      product_id,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Cadastro efetuado com sucesso!',
      productVariation,
    });
  }
}

export default new ProductVariationController();
