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

export default function checkCommands() {
  let successCount = 0;

  commands.forEach((command) => {
    const result = command([]);
    if (result !== undefined) {
      successCount++;
    }
  });

  const totalCommands = commands.length;
  const successPercentage = (successCount / totalCommands) * 100;

  return `Comandos probados: ${totalCommands}\nComandos funcionando: ${successCount}\nPorcentaje de éxito: ${successPercentage.toFixed(
    2
  )}%`;
}
