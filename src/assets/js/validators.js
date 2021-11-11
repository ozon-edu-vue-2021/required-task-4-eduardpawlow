function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}

const parseDate = (value) => {
  const dateArgs = value.split(".");
  const date = new Date(dateArgs[2], dateArgs[1] - 1, dateArgs[0]);
  if (!isValidDate(date)) {
    throw new Error("Invalid Date");
  }
  return date;
};

export const isDate = (value) => {
  try {
    parseDate(value);
    return true;
  } catch (err) {
    return false;
  }
};

export const isDateLowerThatNow = (date) => {
  try {
    return parseDate(date) < new Date();
  } catch (error) {
    return false;
  }
};

export const required = (value) => {
  return !!value;
};

export const isCyrillic = (value) => {
  if (!value) return true;

  const regexp = /^[А-Яа-я ]+$/giu;
  return regexp.test(value);
};

export const isLatin = (value) => {
  if (!value) return true;

  const regexp = /^[A-Za-z ]+$/giu;
  return regexp.test(value);
};

export const checkEmail = (value) => {
  const patternEmail =
    /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return patternEmail.test(value);
};

export const createLengthValidator = (length) => {
  return (value) => {
    return value.length === length;
  };
};
