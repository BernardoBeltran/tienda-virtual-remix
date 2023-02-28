// Obtener la información del curso desde l API
export async function getCurso() {
    const respuesta = await fetch(
        `${process.env.API_URL}/curso?populate=imagen`
    );
    return await respuesta.json();
}
