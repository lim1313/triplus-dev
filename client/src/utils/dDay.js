export const getDday = (date) => {
  const [year, month, day] = date.split('.');
  let today = new Date().getTime();
  let guideDay = new Date(+year, month - 1, +day).getTime();
  let gap = guideDay - today;
  let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return result;
};
