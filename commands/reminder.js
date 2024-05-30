export default function reminder(args) {
  if (args.length < 2) {
    return "Uso: reminder <fecha> <hora> <mensaje>";
  }
  const [date, time, ...message] = args;
  const reminderDate = new Date(`${date}T${time}`);
  if (isNaN(reminderDate.getTime())) {
    return "Formato de fecha/hora incorrecto. El formato debe ser 'YYYY-MM-DD HH:MM'.";
  }
  const formattedDate = reminderDate.toLocaleString();
  const formattedMessage = message.join(" ");
  setTimeout(() => {
    alert(`Recordatorio: ${formattedMessage}`);
  }, reminderDate.getTime() - Date.now());
  return `Recordatorio establecido para ${formattedDate}: ${formattedMessage}`;
}
