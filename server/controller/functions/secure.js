const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: async (plainPassword) => {
    const password = plainPassword;
    const saltRounds = 12;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
    return hashedPassword;
  },
};
