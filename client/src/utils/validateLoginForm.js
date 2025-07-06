// utils/validation.js
export const validateLoginForm = (form) => {
  const { email, password } = form;
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!email.endsWith('@gmail.com')) {
    errors.email = 'Email must include @gmail.com';
  }

   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  if (!password) {
    errors.password = 'Password is required.';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'Password must contain 1 uppercase, 1 number, 1 special character, and be at least 8 characters.';
  }

  return errors;
};
