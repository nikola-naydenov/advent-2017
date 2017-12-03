function adventDayTwo(data) {
    let totalCheckSum = 0;
    data.forEach((entryLine) => totalCheckSum += +getCheckSum(entryLine));
    return totalCheckSum;
}

function adventDayTwoPartTwo(data) {
    let totalCheckSum = 0;
    data.forEach((entryLine) => totalCheckSum += +getPartTwoCheckSum(entryLine));
    return totalCheckSum;
}

function getCheckSum(data) {
    let array = data.split(/\t/g);
    array.sort((a,b) => { return +a - +b });
    return +array[array.length-1] - +array[0];
}

function getPartTwoCheckSum(data) {
    let array = data.split(/\t/g);
    array.sort((a,b) => { return  +b - +a});
    let checkSum = 0;
    for (let i = 0, len = array.length; i < len; i++) {
        for (let t = i+1, len = array.length; t < len; t++) {
            if (array[i] % array[t] === 0) checkSum += array[i] / array[t];
        }
    }
    return checkSum;
}
