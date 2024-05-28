document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = input.value.trim();
      executeCommand(command);
      input.value = "";
    }
  });

  function executeCommand(command) {
    const outputLine = document.createElement("div");
    outputLine.innerHTML = `<span class="prompt">user@terminal:~$</span> ${command}`;
    output.appendChild(outputLine);

    const [cmd, ...args] = command.split(" ");

    switch (cmd) {
      case "whoami":
        appendOutput("test");
        break;
      case "ping":
        simulatePing(args[0] || "");
        break;
      case "cls":
        clearScreen();
        break;
      case "greet":
        greet(args[0] || "user");
        break;
      default:
        appendOutput(`command not found: ${command}`);
        break;
    }

    output.scrollTop = output.scrollHeight;
  }

  function simulatePing(target) {
    if (!target) {
      appendOutput("usage: ping <target>");
      return;
    }

    const pings = 4;
    const delay = 1000;
    for (let i = 0; i < pings; i++) {
      setTimeout(() => {
        const time = (Math.random() * 100).toFixed(2);
        appendOutput(
          `PING ${target}: icmp_seq=${i + 1} ttl=64 time=${time} ms`
        );
        if (i === pings - 1) {
          appendOutput(`\n--- ${target} ping statistics ---`);
          appendOutput(
            `${pings} packets transmitted, ${pings} received, 0% packet loss, time ${
              pings * delay
            }ms`
          );
        }
      }, i * delay);
    }
  }

  function clearScreen() {
    output.innerHTML = "";
  }

  function greet(name) {
    appendOutput(`Hello, ${name}! Welcome to the terminal.`);
  }

  function appendOutput(text) {
    const outputLine = document.createElement("div");
    outputLine.textContent = text;
    output.appendChild(outputLine);
  }
});
