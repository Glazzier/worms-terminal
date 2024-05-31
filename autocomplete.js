export const commands = [
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
  "currency",
  "worldclock",
  "random",
];

export function getSuggestions(currentValue) {
  return commands.filter((command) => command.startsWith(currentValue));
}

export function showSuggestions(input, suggestions) {
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

export function clearSuggestions() {
  const suggestionElements = document.querySelectorAll(".suggestion");
  suggestionElements.forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
