const colors = require("colors");
const args = process.argv.slice(2);
const [from, to] = args;
let isError = false;

if (isNaN(from) || isNaN(to)) {
    console.log(colors.red("Arguments is not a number"));
    isError = true;
}

if (to - from < 1) {
    console.log(colors.red("Arguments have not prime numbers"));
    isError = true;
}

if (!isError) {
    let i = Number(from);
    while (i < Number(to)) {
        console.log(colors.green(i));
        console.log(colors.yellow(i + 1));
        console.log(colors.red(i + 2));

        console.log(i);

        i = i + 3;
    }
}