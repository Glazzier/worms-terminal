export default function search(args) {
  if (args.length === 0) {
    return "Uso: search <término_a_buscar>";
  }
  const searchTerm = args.join(" ");
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`;
  return `Buscando "${searchTerm}"... Abriendo en el navegador: ${searchUrl}`;
}
