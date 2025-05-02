import UserModel from '../models/user.model.js';

class UserDAO {
  async createUser(userData) {
    return await UserModel.create(userData);
  }

  async getUserById(userId) {
    return await UserModel.findById(userId);
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async updateUser(userId, updateData) {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

export default new UserDAO();
