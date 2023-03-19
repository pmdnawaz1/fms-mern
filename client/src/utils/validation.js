export const validateSignup = (user) => {
    const errors = {};
  
    if (!user.name) {
      errors.name = 'Name is required';
    }
  
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    if (!user.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };
  
  export const validateLogin = (user) => {
    const errors = {};
  
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!user.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  