/**
 * Consumes a single temperature in Fahrenheit (a number) and converts to Celsius
 * using this formula:
 *      C = (F - 32) * 5/9
 */
export function fahrenheitToCelius(temperature: number): number {
    let c: number = (temperature - 32) * (5 / 9);
    return c;
}

/**
 * Consumes three numbers and produces their sum. BUT you should only add a number
 * if the number is greater than zero.
 */
export function add3(first: number, second: number, third: number): number {
    let first_add: boolean = first > 0;
    let second_add: boolean = second > 0;
    let third_add: boolean = third > 0;

    let result: number = 0;

    if (first_add) {
        result = result + first;
    }
    if (second_add) {
        result = result + second;
    }
    if (third_add) {
        result = result + third;
    }

    return result;
}

/**
 * Consumes a string and produces the same string in UPPERCASE and with an exclamation
 * mark added to the end.
 */
export function shout(message: string): string {
    let uppercased: string = message.toUpperCase();
    let exclaim: string = `${uppercased}!`;
    return exclaim;
}

/**
 * Consumes a string (a message) and returns a boolean if the string ends in a question
 * mark. Do not use an `if` statement in solving this question.
 */
export function isQuestion(message: string): boolean {
    let result: boolean = message.endsWith("?");
    return result;
}

/**
 * Consumes a word (a string) and returns either `true`, `false`, or `null`. If the string
 * is "yes" (upper or lower case), then return `true`. If the string is "no" (again, either
 * upper or lower case), then return `false`. Otherwise, return `null`.
 */
export function convertYesNo(word: string): boolean | null {
    if (word === "yes" || word === "YES") {
        return true;
    } else if (word === "no" || word === "NO") {
        return false;
    } else {
        return null;
    }
}
