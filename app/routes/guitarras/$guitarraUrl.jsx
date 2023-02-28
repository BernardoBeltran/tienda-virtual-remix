import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { getGuitarra } from "~/models/guitarras.server";

// loader para obtener información de cada guitarra desde la API utilizando rutas dinamicas
export async function loader({ params }) {
    const { guitarraUrl } = params;

    const guitarra = await getGuitarra(guitarraUrl);

    /**
     * Validar que se obtuvo una respuesta desde la API, en caso de ser igual a cero,
     * lanzar una excepción con un objeto de respuesta personalizado
     */
    if (guitarra.data.length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Guitarra No Encontrada",
        });
    }

    return guitarra;
}

// Información meta
export function meta({ data }) {
    // Validar si data está vacío para mostrar información meta personalizada
    if (!data) {
        return {
            title: " GuitarCO - Guitarra No Encontrada",
            description: `Guitararas, venta de guitarras, guitarra no encontrada}`,
        };
    }

    return {
        title: `GuitarCO - ${data.data[0].attributes.nombre}`,
        description: `Guitarars, venta de guitarras, ${data.data[0].attributes.nombre}`,
    };
}

// Componente para manejar rutas dinámicas para cada guitarra
const GuitarraUrl = () => {
    const [cantidad, setCantidad] = useState(0);
    const guitarra = useLoaderData();
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

    // Obtenemos las funciones desde el contexto global
    const { agregarCarrito } = useOutletContext();

    // Manejo del envío del formulario para agregar al carrito
    const handleSubmit = (e) => {
        e.preventDefault();

        if (cantidad < 1) {
            alert("Debe seleccionar una cantidad");
            return;
        }

        // Construimos un objeto con los datos de la guitarra seleccionada
        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad,
        };

        // Ejecutamos la función agregarCarrito
        agregarCarrito(guitarraSeleccionada);
    };

    return (
        <div className="guitarra">
            <img
                src={imagen.data.attributes.url}
                alt={`Imagen de la guitarra ${nombre}`}
                className="imagen"
            />
            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="texto">{descripcion}</p>
                <p className="precio">${precio}</p>

                <form onSubmit={handleSubmit} className="formulario">
                    <label htmlFor="cantidad">Cantidad</label>
                    <select
                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                        id="cantidad"
                    >
                        <option value="0">-- Seleccione --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input type="submit" value="Añadir al carrito" />
                </form>
            </div>
        </div>
    );
};

export default GuitarraUrl;
