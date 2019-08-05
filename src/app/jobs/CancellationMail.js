import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    console.log('A fila executou', data);
    const mailOptions = {
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      from: 'email',
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
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
export default new CancellationMail();
