function adventDayFour(data) {
    return validateData(data, (word, uniqueWords, valid) => {
        if (word in uniqueWords) valid = false;
        uniqueWords[word] = true;
        return valid;
    });
}
function adventDayFourPartTwo(data) {
    return validateData(data, (word, uniqueWords, valid) => {
        word = word.split('');
        word.sort((str1, str2) => str1.localeCompare(str2));
        word = word.join('');
        if (word in uniqueWords) valid = false;
        uniqueWords[word] = true;
        return valid;
    });
}
function validateData(data, validationFunc) {
    let validLines = 0;
    data.forEach(inputLine => {
        let valid = true;
        let words = inputLine.split(' ');
        let uniqueWords = [];
        words.forEach(word => {
            valid = validationFunc(word, uniqueWords, valid);
        });
        if (valid) validLines += 1;
    });
    return validLines;
}
