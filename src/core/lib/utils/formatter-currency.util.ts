const currencyFormatter = (number = 0, location = "es-AR", fraction = 2) =>
  new Intl.NumberFormat(location, { minimumFractionDigits: fraction }).format(
    number
  );

export default currencyFormatter;
