document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  let username = "user"; // Variable para almacenar el nombre de usuario
  let currentDirectory = ""; // Variable para almacenar el directorio actual

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = input.value.trim();
      executeCommand(command);
      input.value = "";
    }
  });

  function executeCommand(command) {
    const outputLine = document.createElement("div");
    outputLine.innerHTML = `<span class="prompt">${username}@terminal:${currentDirectory}$</span> ${command}`;
    output.appendChild(outputLine);

    const [cmd, ...args] = command.split(" ");

    switch (cmd) {
      case "whoami":
        appendOutput(username);
        break;
      case "ping":
        simulatePing(args[0] || "");
        break;
      case "cls":
      case "clear":
        clearScreen();
        break;
      case "greet":
        greet(args[0] || "user");
        break;
      case "change-user":
        changeUser(args[0] || "");
        break;
      case "date":
        showDate();
        break;
      case "echo":
        echo(args.join(" "));
        break;
      case "calc":
        calculate(args.join(""));
        break;
      case "help":
        showHelp();
        break;
      case "cd":
        changeDirectory(args[0] || "");
        break;
      case "view-content":
        viewContent(args[0]);
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

  function changeUser(newUsername) {
    if (!newUsername) {
      appendOutput("usage: change-user <new-username>");
      return;
    }
    const oldUsername = username;
    username = newUsername;
    appendOutput(`Username changed from ${oldUsername} to ${username}`);
    // Update prompt
    const prompts = document.querySelectorAll(".prompt");
    prompts.forEach((prompt) => {
      prompt.innerHTML = `${username}@terminal:${currentDirectory}$`;
    });
  }

  function viewContent() {
    appendOutput(`Current directory: ${currentDirectory}`);
    appendOutput("Content:");
    const files = ["file1.txt", "file2.txt", "file3.txt"];
    files.forEach((file) => {
      appendOutput(file);
    });
  }

  function showDate() {
    const now = new Date();
    appendOutput(now.toString());
  }

  function echo(text) {
    appendOutput(text);
  }

  function calculate(operation) {
    try {
      const result = eval(operation);
      appendOutput(`${operation} = ${result}`);
    } catch (error) {
      appendOutput("Invalid operation");
    }
  }

  function showHelp() {
    const helpInfo = [
      { command: "whoami", description: "Show current username" },
      { command: "ping <target>", description: "Simulate ping to a target" },
      { command: "cls", description: "Clear the screen" },
      { command: "clear", description: "Clear the screen" },
      { command: "greet <name>", description: "Greet the user" },
      {
        command: "change-user <new-username>",
        description: "Change the username",
      },
      { command: "date", description: "Show current date and time" },
      { command: "echo <text>", description: "Display the provided text" },
      {
        command: "calc <operation>",
        description: "Calculate a mathematical operation",
      },
      { command: "help", description: "Show this help message" },
      { command: "cd <directory>", description: "Change current directory" }, // Agregamos el comando cd al menú de ayuda
    ];

    const longestCommandLength = Math.max(
      ...helpInfo.map((info) => info.command.length)
    );
    helpInfo.forEach((info) => {
      const commandPadding = " ".repeat(
        longestCommandLength - info.command.length
      );
      appendOutput(`${info.command}${commandPadding}  ${info.description}`);
    });
  }

  function appendOutput(text) {
    const outputLine = document.createElement("div");
    outputLine.textContent = text;
    output.appendChild(outputLine);
  }

  function changeDirectory(directory) {
    // Si no se especifica un directorio, mostramos un mensaje de uso
    if (!directory) {
      appendOutput("usage: cd <directory>");
      return;
    }

    // Simulamos que solo se puede acceder a la carpeta "files"
    if (directory === "files") {
      currentDirectory = `/${directory}`;
      appendOutput(`Changed directory to ${currentDirectory}`);
    } else {
      appendOutput(`Directory not found: ${directory}`);
    }

    // Actualizamos el prompt
    const prompts = document.querySelectorAll(".prompt");
    prompts.forEach((prompt) => {
      prompt.innerHTML = `${username}@terminal:${currentDirectory}$`;
    });
  }
});
