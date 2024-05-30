export default function echo(args) {
  if (args.length === 0) {
    return "Uso: echo [mensaje]";
  }
  const message = args.join(" ");
  return message;
}
