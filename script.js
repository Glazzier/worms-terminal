document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const themeSelect = document.getElementById("theme-select");
  const menuIcon = document.getElementById("menu-icon");

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
    showSuggestions(suggestions);
  });

  themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    document.getElementById("css-link").href = selectedTheme;
  });

  menuIcon.addEventListener("click", () => {
    themeSelect.classList.toggle("show");
  });

  function getSuggestions(currentValue) {
    return [
      "calc",
      "changeuser",
      "check-commands",
      "clear",
      "datetime",
      "echo",
      "help",
      "reminder",
      "search",
      "test-performance",
      "timer",
      "weather",
      "whoami",
    ].filter((command) => command.startsWith(currentValue));
  }

  function showSuggestions(suggestions) {
    clearSuggestions();
    suggestions.forEach((command) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.textContent = command;
      suggestionElement.classList.add("suggestion");
      suggestionElement.tabIndex = 0;
      suggestionElement.addEventListener("click", () => {
        input.value = command;
        clearSuggestions();
        input.focus();
      });
      suggestionElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          input.value = command;
          clearSuggestions();
          input.focus();
        }
      });
      input.parentNode.appendChild(suggestionElement);
    });
  }

  function clearSuggestions() {
    const suggestionElements = document.querySelectorAll(".suggestion");
    suggestionElements.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

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
