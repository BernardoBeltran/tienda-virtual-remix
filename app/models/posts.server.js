// Obtener posts desde la API
export async function getPosts() {
    const respuesta = await fetch(
        `${process.env.API_URL}/posts?populate=imagen`
    );
    const resultado = await respuesta.json();

    return resultado;
}

// Obtener un post desde la API según el parámetro url
export async function getPost(url) {
    const respuesta = await fetch(
        `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`
    );
    const resultado = await respuesta.json();

    return resultado;
}
