const fs = require("fs");
const lineReader = require("readline");

const logPath = "./access.log";

const readStream = fs.createReadStream(logPath);
const writeStream1 = fs.createWriteStream("89.123.1.41_requests.log", {
  encoding: "utf-8",
  flags: "a",
});
const writeStream2 = fs.createWriteStream("34.48.240.111_requests.log", {
  encoding: "utf-8",
  flags: "a",
});

const rd = lineReader.createInterface({
  input: readStream,
});

rd.on("line", (line) => {
  if (line.includes("89.123.1.41")) {
    writeStream1.write(line + "\n");
  } else if (line.includes("34.48.240.111")) {
    writeStream2.write(line + "\n");
  }
});
