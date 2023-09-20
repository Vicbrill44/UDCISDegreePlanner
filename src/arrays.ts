/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return [];
    } else if (numbers.length === 1) {
        return [...numbers, ...numbers];
    } else {
        const firstlast = [numbers[0], numbers[numbers.length - 1]];
        return firstlast;
    }
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const tripled = numbers.map((number: number): number => number * 3);
    return tripled;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const strToInt = numbers.map((word: string): number => {
        const toNum = parseInt(word, 10);
        return isNaN(toNum) ? 0 : toNum;
    });
    return strToInt;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const remDollarSign = amounts.map((item: string): string => {
        const remDollSign = item.replace("$", "");
        return remDollSign;
    });
    const strToInt = remDollarSign.map((item: string): number => {
        const toNum = parseInt(item, 10);
        return isNaN(toNum) ? 0 : toNum;
    });
    return strToInt;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const uppercase = messages.map((message: string): string => {
        if (message.endsWith("!")) {
            const uppered = message.toUpperCase();
            return uppered;
        }
        return message;
    });
    const removeQuestion = uppercase.filter(
        (message: string) => !message.endsWith("?")
    );
    return removeQuestion;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const shortWords = words.filter((word: string): boolean => word.length < 4);
    return shortWords.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length === 0) {
        return true;
    }
    const colorChecker = colors.every(
        (color: string): boolean =>
            color === "red" || color === "blue" || color === "green"
    );
    return colorChecker;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length === 0) {
        return "0=0";
    }

    const math = addends.reduce((x: number, add: number) => x + add, 0);
    return `${math}=${addends.join("+")}`;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    const negNum: number = values.findIndex((value: number) => value < 0);

    if (negNum === -1) {
        const sum: number = values.reduce(
            (tot: number, value: number) => tot + value,
            0
        );
        return [...values, sum];
    }
    const sum: number = values
        .slice(0, negNum)
        .reduce((tot: number, value: number) => tot + value, 0);
    return [...values.slice(0, negNum + 1), sum, ...values.slice(negNum + 1)];
}
