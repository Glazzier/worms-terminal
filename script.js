import {
  getSuggestions,
  showSuggestions,
  clearSuggestions,
} from "./autocomplete.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let commandHistory = JSON.parse(localStorage.getItem("commandHistory")) || [];
  let historyIndex = -1;

  function updateCommandHistory() {
    localStorage.setItem("commandHistory", JSON.stringify(commandHistory));
  }

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (input.parentNode.querySelector(".suggestion")) {
        event.preventDefault();
        input.value = input.parentNode.querySelector(".suggestion").textContent;
        clearSuggestions();
        input.focus();
      } else {
        const command = input.value.trim();
        input.value = "";
        output.innerHTML += `<div class="new-line">> ${command}</div>`;

        commandHistory.push(command);
        updateCommandHistory();
        historyIndex = commandHistory.length - 1;

        const result = await executeCommand(command);
        output.innerHTML += `<div class="new-line">${result}</div>`;
        output.scrollTop = output.scrollHeight;
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      if (historyIndex >= 0) {
        input.value = commandHistory[historyIndex];
        historyIndex--;
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        input.value = "";
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const suggestions = input.parentNode.querySelectorAll(".suggestion");
      if (suggestions.length > 0) {
        suggestions[0].focus();
      }
    }
  });

  input.addEventListener("input", () => {
    const currentValue = input.value.trim();
    const suggestions = getSuggestions(currentValue);
    showSuggestions(input, suggestions);
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
