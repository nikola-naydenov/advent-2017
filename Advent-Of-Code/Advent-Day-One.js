function adventOfCodeDayOne(data) {
    let sum = 0;
    for (let i = 0, len = data.length; i < len; i++) {
        if (data[i] === getAtIndexTreatAsCircle(data, i+1)) {
            sum += +data[i];
        }
    }
    return sum;
}

function adventOfCodeDayOnePartTwo(data) {
    let sum = 0;
    for (let i = 0, len = data.length; i < len; i++) {
        if (data[i] === getAtIndexTreatAsCircle(data, i+data.length/2)) {
            sum += +data[i];
        }
    }
    return sum;
}

function getAtIndexTreatAsCircle(data, index) {
    let newIndex = index >= data.length ? index % data.length : index;
    return data[newIndex];
}