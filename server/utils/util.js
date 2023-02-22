const bcrypt = require("bcryptjs");
const moment = require("moment");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  // console.log("password::", password);
  // console.log("hash::", hash);

  let resut = bcrypt.compareSync(password, hash);
  return resut;
};

const getUtcDate = () => {
  var utcMoment = moment.utc();
  var utcDate = new Date(utcMoment.format());
  return utcDate;
};

module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
  getUtcDate: getUtcDate,
};
