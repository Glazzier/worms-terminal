export default function timer(args) {
  if (args.length !== 1 || isNaN(args[0])) {
    return "Uso: timer <duración_en_minutos>";
  }
  const duration = parseInt(args[0]) * 60 * 1000; // Duración en milisegundos
  setTimeout(() => {
    alert("¡El temporizador ha terminado!");
  }, duration);
  return `Temporizador establecido para ${args[0]} minutos.`;
}
