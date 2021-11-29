export const idValidation = (userId) => {
  const regId = /^[a-zA-Z0-9]{4,12}$/;
  return regId.test(userId);
};
