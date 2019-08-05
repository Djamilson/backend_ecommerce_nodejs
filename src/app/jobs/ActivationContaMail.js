import Mail from '../../lib/Mail';

class ActivationContaMail {
  get key() {
    return 'ActivationContaMail';
  }

  async handle({ data }) {
    const { user, link } = data;

    console.log('A fila executou', data);
    const mailOptions = {
      to: `${user.name} <${user.email}>`,
      from: 'email',
      subject: 'Validação de conta',
      template: 'activation',
      context: {
        link,
        user: user.name,
      },
    };

    try {
      await Mail.sendMail(mailOptions, (err, info) => {
        console.log('email sent');

        if (err) {
          console.log('Error 1', err);
        }
        console.log('Info: ', info);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
export default new ActivationContaMail();
