export default function help(args) {
    const availableCommands = [
        { name: 'calc', description: 'Realiza cálculos aritméticos simples.' },
        { name: 'changeuser', description: 'Cambia el usuario actual.' },
        { name: 'check-commands', description: 'Prueba todos los comandos y muestra el resultado.' },
        { name: 'clear', description: 'Limpia la pantalla de la terminal y mueve el cursor al principio.' },
        { name: 'cls', description: 'Limpia la pantalla de la terminal.' },
        { name: 'datetime', description: 'Muestra la fecha y hora actuales.' },
        { name: 'echo', description: 'Muestra un mensaje en la pantalla.' },
        { name: 'help', description: 'Proporciona información sobre los comandos disponibles.' },
        { name: 'reminder', description: 'Establece un recordatorio.' },
        { name: 'search', description: 'Realiza una búsqueda en línea.' },
        { name: 'test-performance', description: 'Prueba el rendimiento de todos los comandos disponibles.' },
        { name: 'timer', description: 'Establece un temporizador.' },
        { name: 'weather', description: 'Muestra el pronóstico del tiempo para una ciudad.' },
        { name: 'whoami', description: 'Muestra el usuario actual.' }
    ];
  
    const maxCommandsPerPage = 10;
    const totalPages = Math.ceil(availableCommands.length / maxCommandsPerPage);
    let page = 1;
  
    if (args.length === 1) {
        const pageNumber = parseInt(args[0]);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
            page = pageNumber;
        } else {
            return `Página no encontrada: ${args[0]}`;
        }
    }
  
    const startIndex = (page - 1) * maxCommandsPerPage;
    const endIndex = Math.min(startIndex + maxCommandsPerPage, availableCommands.length);
    const displayedCommands = availableCommands.slice(startIndex, endIndex);
  
    let helpMessage = `Comandos disponibles (Página ${page}/${totalPages}):\n`;
    displayedCommands.forEach(command => {
        helpMessage += `\n<span class="help-command">${command.name}</span>: <span class="help-description">${command.description}</span>`;
    });
  
    return helpMessage;
  }
  