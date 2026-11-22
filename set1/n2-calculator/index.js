const operations = require("./operations");
const formatResult = require("./formatter");
const os = require("os");

const operation = process.argv[2];
const numbers = process.argv.slice(3).map(Number);

if (numbers.length === 0 || numbers.some(number => Number.isNaN(number))) {
    console.log("Please provide valid numbers.");
    console.log("Example: node index.js add 10 5");
    process.exit(1);
}

try {
    let result;

    switch (operation) {
        case "add":
            result = numbers.reduce((total, number) => total + number, 0);
            break;

        case "subtract":
            result = numbers.slice(1).reduce(
                (total, number) => total - number,
                numbers[0]
            );
            break;

        case "multiply":
            result = numbers.reduce((total, number) => total * number, 1);
            break;

        case "divide":
            result = numbers.slice(1).reduce(
                (total, number) => operations.divide(total, number),
                numbers[0]
            );
            break;

        case "average":
            result = operations.average(numbers);
            break;

        default:
            console.log("Unknown operation.");
            console.log("Available operations: add, subtract, multiply, divide, average");
            process.exit(1);
    }

    console.log(formatResult(operation, result));
    console.log(`Operating System: ${os.platform()}`);

} catch (error) {
    console.log(`Error: ${error.message}`);
}