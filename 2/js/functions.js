// Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

// Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
}

// Дополнительная функция
function extractNumber(string) {
  const stringValue = string.toString();

  let digitsString = '';

  for (let i = 0; i < stringValue.length; i++) {
    const char = stringValue[i];
    const digit = parseInt(char, 10);
    if (!Number.isNaN(digit)) {
      digitsString += char;
    }
  }

  if (digitsString === '') {
    return NaN;
  }

  return parseInt(digitsString, 10);
}
