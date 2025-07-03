
export const validateRegisterForm = (form) => {
  const { name, email, password, confirmPassword } = form;
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!email.endsWith('@gmail.com')) {
    errors.email = 'Email must be a Gmail address.';
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  if (!password) {
    errors.password = 'Password is required.';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'Password must contain 1 uppercase, 1 number, 1 special character, and be at least 8 characters.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};
