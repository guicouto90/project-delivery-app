const TEN = 10;
const EIGHT = 8;
const SEVEN = 7;
const FIVE = 5;
const FOUR = 4;

const formatedDate = (date) => {
  const dd = date.substring(EIGHT, TEN);
  const mm = date.substring(FIVE, SEVEN);
  const yyyy = date.substring(0, FOUR);
  return `${dd}/${mm}/${yyyy}`;
};

module.exports = formatedDate;
