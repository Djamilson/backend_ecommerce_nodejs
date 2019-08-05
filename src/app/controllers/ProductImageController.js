import sharp from 'sharp';
import pathlocal from 'path';
import fs from 'fs';
import File from '../models/ProductImage';

class ProductImageController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { description, order, product_variation_id } = req.body;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(pathlocal.resolve(req.file.destination, 'resized', path));
    // remove os arquivo da pasta, arquivos velhos
    fs.unlinkSync(req.file.path);

    const file = await File.create({
      name,
      path,
      description,
      order,
      product_variation_id,
    });

    return res.json(file);
  }
}

export default new ProductImageController();
