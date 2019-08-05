import * as Yup from 'yup';
import Category from '../models/Category';

require('dotenv').config();

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll({
      order: ['category'],
      attributes: ['id', 'category'],
    });

    return res.json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      category: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { category, description } = req.body;
    /*
    Check if category is a exist
    */

    const checkIsCategory = await Category.findOne({
      where: { category },
    });

    if (checkIsCategory) {
      return res
        .status(401)
        .json({ error: 'Could not create category because it already exists' });
    }

    /**
     * Check date availability
     */

    const categori = await Category.create({
      category,
      description,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Cadastro efetuado com sucesso!',
      categori,
    });
  }
}

export default new CategoryController();
