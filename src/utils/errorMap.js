const errorMap = {
  PASSENGER_NOT_FOUND: 404,
  MISSING_VALUE: 400,
  OUTSIDE_VALUE: 422,
  NOTFOUND_PRODUCT: 404,
  SALE_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};