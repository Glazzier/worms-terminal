export default function calc(args) {
  if (args.length !== 1) {
    return "Uso: calc <expresión_aritmética>";
  }
  try {
    const result = eval(args[0]);
    return `Resultado: ${result}`;
  } catch (error) {
    return "Error en la expresión aritmética";
  }
}