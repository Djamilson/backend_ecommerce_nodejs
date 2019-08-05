import sharp from 'sharp';
import pathlocal from 'path';
import fs from 'fs';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(pathlocal.resolve(req.file.destination, 'resized', path));
    // remove os arquivo da pasta, arquivos velhos
    fs.unlinkSync(req.file.path);

    const file = await File.create({ name, path });

    return res.json(file);
  }
}

export default new FileController();
