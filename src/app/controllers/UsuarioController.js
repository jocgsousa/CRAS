import User from '../models/User';
import Endereco from '../models/Endereco';

class UsuarioController {
  async store(request, response) {
    const userExists = await User.findOne({
      where: {
        email: request.body.email,
      },
    });
    if (userExists) {
      return response.status(401).json({ error: 'Conta de e-mail já cadastrada' });
    }
    const {
      id, name, email, actived,
    } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
      actived,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const user = await User.findByPk(id);

    if (!user) {
      return response.status(401).json({ error: 'User not faund' });
    }

    if (user.email !== request.body.email) {
      const userExists = await User.findOne({
        where: {
          email: request.body.email,
        },
      });
      if (userExists) {
        return response.status(401).json({ error: 'Conta de e-mail já em uso!' });
      }
    }

    await user.update(request.body);
    return response.json(user);
  }

  async index(request, response) {
    const user = await User.findAndCountAll({
      where: {
        provider: false,
        actived: true,
      },
      attributes: ['id', 'name', 'email', 'phone'],
      include: [{
        model: Endereco,
        as: 'endereco',
      }],
    });
    return response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const isUser = await User.findByPk(id);

    if (!isUser) {
      return response.status(401).json({ error: 'Usuário não encontrado' });
    }

    await isUser.destroy();

    return response.json({ ok: 'deletado com sucesso' });
  }

  async search(request, response) {
    const { cpf } = request.body;

    const users = await User.findAll({
      where: {
        cpf,
        provider: false,
        actived: true,
      },
    });
    const achados = users.filter((user) => (user.cpf) === cpf);
    return response.json(achados);
  }
}
export default new UsuarioController();
