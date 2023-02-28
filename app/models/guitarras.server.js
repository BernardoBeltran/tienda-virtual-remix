// Función del lado del servidor para obtener las guitarras desde la API
export async function getGuitarras() {
    const respuesta = await fetch(
        `${process.env.API_URL}/guitarras?populate=imagen`
    );
    const resultado = await respuesta.json();

    return resultado;
}

// Obtener una guitarra desde la API según el parámetro url
export async function getGuitarra(url) {
    const respuesta = await fetch(
        `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
    );
    const resultado = await respuesta.json();

    return resultado;
}
