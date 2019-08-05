import { startOfHour, parseISO, isAfter } from 'date-fns';

import Token from '../models/Token';
import User from '../models/User';

class TokenController {
  async index(req, res) {
    const { token } = req.params;

    const tokenn = await Token.findOne({ where: { token } });

    // Make sure the user has been verified

    const hourStart = startOfHour(parseISO(tokenn.expires));

    if (!isAfter(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Token expirado, gere novo token, em recuperar senha!',
      });
    }

    const user = await User.findByPk(tokenn.user_id);
    if (!user) {
      return res.status(400).json({
        error: 'Não foi possível encontra um usuário para esse token!',
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        error: 'Este email já foi verificado!',
      });
    }

    User.update({ is_verified: true, user }, { where: { id: user.id } });
    Token.update({ status: true, tokenn }, { where: { id: tokenn.id } });

    return res.status(200).json({
      success: 'Conta verificada com sucesso, já pode acessar a área restrita!',
    });
  }

  async update(req, res) {
    /**
     * const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    // Make sure the user has been verified
    if (!user) {
      return res.status(400).json({
        error: 'Não foi possível encontra um usuário para esse Token!',
      });
    }

    const tokenTest = await Token.findAll({
      include: [{ model: User, as: 'user' }],

      where: {
        user_id: user.id,
        status: false,
      },
    });

    const hourStart = startOfHour(parseISO(tokenTest[0].expires));

    if (tokenTest.length > 0 && isAfter(hourStart, new Date()) && &&
    tokenTest[0].status !== true) {
      return res.status(400).json({
        error:  `Você tem um token que ainda não expirou, entre no email ${email} para usá-lo!`
      });
    }

    // Create a verification token for this user
    const token = await Token.create({
      user_id: user.id,
      expires: moment()
        .add('1', 'days')
        .format(),
    });

     */
    return res.json();
  }
}

export default new TokenController();
