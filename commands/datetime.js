export default function datetime(args) {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = now.toLocaleDateString("es-ES", options);
  return formattedDate;
}
