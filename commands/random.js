export default function random(args) {
  if (args.length !== 2) {
    return "Uso: random <min> <max>";
  }

  const min = parseFloat(args[0]);
  const max = parseFloat(args[1]);

  if (isNaN(min) || isNaN(max)) {
    return "Por favor, introduce números válidos.";
  }

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return `Número aleatorio entre ${min} y ${max}: ${randomNumber}`;
}
