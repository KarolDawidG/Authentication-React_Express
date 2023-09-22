const numberOfQuestions = 20;

const generateRandomNumbers = (rows) => {
  const numbers = [];
  while (numbers.length < numberOfQuestions) {
    const randomNumber = Math.floor(Math.random() * rows) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

module.exports = {
  generateRandomNumbers,
};
