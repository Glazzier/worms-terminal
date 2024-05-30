document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  // Array para almacenar los comandos utilizados anteriormente
  let commandHistory = [];
  // Índice para mantener el seguimiento del comando actual en el historial
  let historyIndex = -1;

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const command = input.value.trim();
      input.value = "";

      // Añadir el comando al historial
      commandHistory.push(command);
      historyIndex = commandHistory.length - 1;

      output.innerHTML += `<div class="new-line">> ${command}</div>`;

      const result = await executeCommand(command);
      output.innerHTML += `<div class="new-line">${result}</div>`;
      output.scrollTop = output.scrollHeight;
    } else if (event.key === "ArrowUp") {
      // Evitar que el cursor se mueva al principio del campo de entrada
      event.preventDefault();

      // Mostrar el comando anterior en el historial
      if (historyIndex >= 0) {
        input.value = commandHistory[historyIndex];
        historyIndex--;
      }
    } else if (event.key === "ArrowDown") {
      // Evitar que el cursor se mueva al final del campo de entrada
      event.preventDefault();

      // Mostrar el comando siguiente en el historial
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        // Si no hay más comandos siguientes, limpiar el campo de entrada
        input.value = "";
      }
    }
  });

  async function executeCommand(command) {
    const [cmd, ...args] = command.split(" ");

    try {
      const module = await import(`./commands/${cmd}.js`);
      return module.default(args);
    } catch (e) {
      return `Command not found: ${cmd}`;
    }
  }
});
