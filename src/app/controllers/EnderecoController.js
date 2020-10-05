import Endereco from '../models/Endereco';
import User from '../models/User';

class EnderecoController {
  async store(request, response) {
    const {
      user_id, bairro, rua, cidade, estado, referencia, numero,
    } = request.body;
    const isUser = await User.findByPk(user_id);
    if (!isUser) {
      return response.status(401).json({ error: 'User not found' });
    }

    const andress = await Endereco.create({
      bairro,
      rua,
      cidade,
      estado,
      referencia,
      numero,
    });
    await isUser.update({ fk_endereco_id: andress.id });
    return response.json(isUser);
  }
}

export default new EnderecoController();
