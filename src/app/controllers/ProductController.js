import * as Yup from 'yup';
import Product from '../models/Product';

require('dotenv').config();

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'description'],
    });

    return res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, description } = req.body;
    /*
    Check if Product is a exist
    */

    const checkIsProduct = await Product.findOne({
      where: { name, description },
    });

    if (checkIsProduct) {
      return res
        .status(401)
        .json({ error: 'Could not create Product because it already exists' });
    }

    /**
     * Check date availability
     */

    const producto = await Product.create({
      name,
      description,
    });

    return res.json(producto);
  }
}

export default new ProductController();
