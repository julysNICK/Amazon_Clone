module.exports = (app) => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  }
  function notExistOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }
  function equalOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }

  function validationEmail(email, msg) {
    const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!validEmail.test(email))  throw msg;
  }
  return { existsOrError, notExistOrError, equalOrError, validationEmail };
};
