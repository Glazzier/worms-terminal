export default function clear(args) {
    // Limpiar la pantalla de la terminal y mover el cursor al principio.
    const output = document.getElementById('output');
    output.innerHTML = '';
    return ''; // Devuelve una cadena vacía, ya que no hay mensaje para mostrar.
}