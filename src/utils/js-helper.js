export const leftPad = (str, fillChar, length = 20) => {
    str = '' + str;
    return `${fillChar.repeat(Math.max(length - str.length, 0))}${str}`;
}

export const rightPad = (str, fillChar, length = 20) => {
    str = '' + str;
    return `${str}${fillChar.repeat(Math.max(length - str.length, 0))}`;
}
