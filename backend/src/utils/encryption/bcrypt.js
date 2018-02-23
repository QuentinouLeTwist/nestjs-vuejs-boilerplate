const bcrypt = require('bcrypt');

export class Bcrypt {
  async hash(password, callback) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt, callback);
  }
  async compare(password, encrypted, callback) {
    return await bcrypt.compare(password, encrypted, callback);
  }
}