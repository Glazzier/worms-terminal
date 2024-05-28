import whoami from "./whoami.js";
import changeuser from "./changeuser.js";
import help from "./help.js";
import cls from "./cls.js";
import clear from "./clear.js";
import datetime from "./datetime.js";
import calc from "./calc.js";
import search from "./search.js";
import timer from "./timer.js";
import weather from "./weather.js";
import reminder from "./reminder.js";

const commands = [
  whoami,
  changeuser,
  help,
  cls,
  clear,
  datetime,
  calc,
  search,
  timer,
  weather,
  reminder,
];

export default function testPerformance() {
  let totalTime = 0;
  let commandCount = 0;

  commands.forEach((command) => {
    const start = performance.now();
    command([]);
    const end = performance.now();
    totalTime += end - start;
    commandCount++;
  });

  const averageTime = totalTime / commandCount;

  return `Comandos probados: ${commandCount}\nTiempo total de ejecución: ${totalTime.toFixed(
    2
  )} ms\nPromedio de tiempo por comando: ${averageTime.toFixed(2)} ms`;
}
