export const idValidation = (userId) => {
  const regId = /^[a-zA-Z0-9]{4,12}$/;
  return regId.test(userId);
};

export const nickValidation = (nick) => {
  const regId = /^[a-zA-Z0-9]{3,8}$/;
  return regId.test(nick);
};

export const emailValidation = (userEmail) => {
  const regEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  return regEmail.test(userEmail);
};

export const pwValidaton = (password) => {
  const regPw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regPw.test(password);
};
