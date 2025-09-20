const verifyFullNameField = (fullName) => {
  const arr = (fullName + "").split(" ");
  if (arr.length != 2) return false;

  if (arr[0].length >= 2 && arr[1].length >= 2) return true;

  return false;
};

const verifyPasswrod = (password) => {
  /**
    I need to check if input password is 
8-12 characters (inclusive)
at least 2 lowercase alphabet
at least 2 uppercase alphabet
at least 3 numbers
at least 2 digits
in javascript   
 
     */
  if (password.length < 8 || password.length > 12) return false;

  const lowercase = (password.match(/[a-z]/g) || []).length;
  const uppercase = (password.match(/[A-Z]/g) || []).length;
  const digits = (password.match(/[0-9]/g) || []).length;

  return lowercase >= 1 && uppercase >= 1 && digits >= 1;
};

export { verifyFullNameField, verifyPasswrod };
