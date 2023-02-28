import { useLoaderData } from "@remix-run/react";
import ListadoGuitarras from "~/components/listado-guitarras";
import { getGuitarras } from "~/models/guitarras.server";

export function meta() {
    return {
        title: "GuitarCO - Tienda",
        description: "GuitarCO - Conoce toda nuestra colección de guitarras",
    };
}

// loader para obtener guitarras desde la API
export async function loader() {
    const guitarras = await getGuitarras();

    return guitarras.data;
}

const Tienda = () => {
    const guitarras = useLoaderData();

    return <ListadoGuitarras guitarras={guitarras} />;
};

export default Tienda;
