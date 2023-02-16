export default (password) => {
  const upperCaseRegExp = new RegExp(/[A-Z]+/);
  const digitRegExp = new RegExp(/[0-9]+/);
  const lowerCaseRegExp = new RegExp(/[a-z]+/);
  const specialCharRegExp = new RegExp(/[$&+,:;=?@#|'<>.^*()%!-]/);

  let entropy = 5;
  if (
    password.length >= 8 &&
    password.match(upperCaseRegExp) &&
    password.match(lowerCaseRegExp) &&
    password.match(digitRegExp) &&
    password.match(specialCharRegExp)
  ) {
    entropy = 50;
  } else if (
    password.length >= 8 &&
    ((password.match(upperCaseRegExp) && password.match(lowerCaseRegExp)) ||
      (password.match(lowerCaseRegExp) && password.match(digitRegExp)) ||
      (password.match(digitRegExp) && password.match(specialCharRegExp)) ||
      (password.match(upperCaseRegExp) && password.match(digitRegExp)) ||
      (password.match(upperCaseRegExp) && password.match(specialCharRegExp)) ||
      (password.match(lowerCaseRegExp) && password.match(specialCharRegExp)))
  ) {
    entropy = 30;
  } else if (
    password.length < 8 &&
    (password.match(upperCaseRegExp) || password.match(lowerCaseRegExp) || password.match(digitRegExp))
  ) {
    entropy = 10;
  }

  return entropy;
};
