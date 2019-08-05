import * as Yup from 'yup';
import Product from '../models/Product';
import ProductVariation from '../models/ProductVariation';
import CategoryProduct from '../models/CategoryProduct';
import Price from '../models/Price';

require('dotenv').config();

class CategoryProductController {
  async index(req, res) {
    const product_variations = await ProductVariation.findAll({
      attributes: [
        'id',
        'name',
        'sku',
        'available',
        'variation_name',
        'weight',
        'order',
      ],

      include: [
        { model: Product, as: 'product', attributes: ['name', 'description'] },
        {
          model: Price,
          as: 'price',
          attributes: ['id', 'price', 'price_from'],
        },
      ],
    });

    return res.json(product_variations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      category_id: Yup.string().required(),
      product_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product_id, category_id } = req.body;

    /*
    Check if category is a exist
    */

    const checkIsCategory = await CategoryProduct.findOne({
      where: { product_id, category_id },
    });

    if (checkIsCategory) {
      return res
        .status(401)
        .json({ error: 'Could not create category because it already exists' });
    }

    /**
     * Check date availability
     */

    const category_product = await CategoryProduct.create({
      category_id,
      product_id,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Cadastro efetuado com sucesso!',
      category_product,
    });
  }
}

export default new CategoryProductController();
