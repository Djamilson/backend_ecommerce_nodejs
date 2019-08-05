import * as Yup from 'yup';
import Horario from '../models/Horario';

class HorarioController {
  async index(req, res) {
    const horarios = await Horario.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['horario'],
      attributes: ['id', 'horario'],
    });
    return res.json(horarios);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      hora: Yup.number().required(),
      min: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const horariofinal = `${req.body.hora}:${req.body.min}`;

    const horarioExists = await Horario.findOne({
      where: {
        horario: horariofinal,
        user_id: req.userId,
      },
    });

    if (horarioExists && horarioExists.canceled_at === null) {
      return res.status(400).json({ error: 'Time already exists.' });
    }

    if (horarioExists && horarioExists.canceled_at !== null) {
      const { id, horario } = await horarioExists.update(
        { canceled_at: null, horarioExists },
        { where: { id: horarioExists.id } }
      );

      return res.json({ id, horario });
    }

    const horario = await Horario.create({
      horario: horariofinal,
      user_id: req.userId,
    });

    return res.json(horario);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      hora: Yup.number().max(2),
      min: Yup.number().max(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const horarioBanco = await Horario.findByPk(req.params.id);

    const { id, horario } = await horarioBanco.update(req.body);

    return res.json({
      id,
      horario,
    });
  }

  async delete(req, res) {
    const horarioExists = await Horario.findByPk(req.params.id);

    const { id, horario } = await horarioExists.update(
      { canceled_at: new Date(), horarioExists },
      { where: { id: horarioExists.id } }
    );

    return res.json({ id, horario });
  }
}

export default new HorarioController();
