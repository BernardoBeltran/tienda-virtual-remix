import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

// Información meta
export function meta({ data }) {
    // Validar si data está vacío para mostrar información meta personalizada
    if (!data) {
        return {
            title: " GuitarCO - Entrada No Encontrada",
            description: `Guitarars, venta de guitarras, entrada no encontrada}`,
        };
    }

    return {
        title: `GuitarCO - ${data?.data[0]?.attributes?.titulo}`,
        description: `Guitarars, venta de guitarras, entrada ${data.data[0].attributes?.titulo}`,
    };
}

// loader para obtener información de cada post desde la API utilizando rutas dinamicas
export async function loader({ params }) {
    const { postUrl } = params;

    const post = await getPost(postUrl);

    /**
     * Validar que se obtuvo una respuesta desde la API, si el arreglo esta vacío,
     * lanzar una excepción con un objeto de respuesta personalizado
     */
    if (post.data.length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Entrada No Encontrada",
        });
    }

    return post;
}

const PostUrl = () => {
    const post = useLoaderData();
    const { titulo, contenido, imagen, publishedAt } =
        post?.data[0]?.attributes;
    return (
        <article className="post mt-3">
            <img
                className="imagen"
                src={imagen?.data?.attributes?.url}
                alt={`Imagen del blog ${titulo}`}
            />
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
        </article>
    );
};

export default PostUrl;
