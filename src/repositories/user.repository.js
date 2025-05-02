import UserDAO from '../daos/user.dao.js';

class UserRepository {
  create(userData) {
    return UserDAO.createUser(userData);
  }

  findById(userId) {
    return UserDAO.getUserById(userId);
  }

  findByEmail(email) {
    return UserDAO.getUserByEmail(email);
  }

  update(userId, updateData) {
    return UserDAO.updateUser(userId, updateData);
  }

  delete(userId) {
    return UserDAO.deleteUser(userId);
  }
}

export default new UserRepository();
