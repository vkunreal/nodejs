// console.log('Record 1');

// setTimeout(() => {
//   console.log('Record 2');
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//     сonsole.log('Record 3');
//     Promise.resolve().then(() => {
//       console.log('Record 4');
//       });
//     });
//   });
// });

/* 
    Правильный ответ: 1234

    1 - Выполняется синхронный код
    2 - Выполняется синхронный код в setTimeout, промис помещается в очередь
    3 - Выполняется промис, а в нём setTimeout, а в нём синхронный код, промис помещается в очередь
    4 - Выполняется промис
*/

// час-день-месяц-год

const args = process.argv.slice(2);

const millsec = {
  year: 31356000000,
  month: 2592000000,
  hour: 3600000,
  day: 86400000,
  minute: 60000,
  second: 1000,
};

const getDateStr = (date) =>
  `years: ${date.years}, months: ${date.months}, days: ${date.days}, hours: ${date.hours}, minutes: ${date.minutes}, seconds: ${date.seconds}`;

args.forEach((item) => {
  const args = item.split(" ");

  const time = args[0].split(":");
  const days = args[1].split(".");

  const endDate = new Date(
    days[2],
    days[1] - 1,
    days[0],
    time[0],
    time[1],
    time[2]
  );

  setInterval(() => {
    const date = new Date();
    const resultDate = endDate.getTime() - date.getTime();

    const years = Math.floor(resultDate / millsec.year);
    const months = Math.floor(
      (resultDate - years * millsec.year) / millsec.month
    );
    const days = Math.floor(
      (resultDate - (years * millsec.year + months * millsec.month)) /
        millsec.day
    );
    const hours = Math.floor(
      (resultDate -
        (years * millsec.year + months * millsec.month + days * millsec.day)) /
        millsec.hour
    );
    const minutes = Math.floor(
      (resultDate -
        (years * millsec.year +
          months * millsec.month +
          days * millsec.day +
          hours * millsec.hour)) /
        millsec.minute
    );
    const seconds = Math.floor(
      (resultDate -
        (years * millsec.year +
          months * millsec.month +
          days * millsec.day +
          hours * millsec.hour +
          minutes * millsec.minute)) /
        millsec.second
    );

    const result = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };

    console.log(getDateStr(result));
  }, 1000);
});
