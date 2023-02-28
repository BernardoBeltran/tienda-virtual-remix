import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/guitarras.css";

export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles,
        },
    ];
}

const Tienda = () => {
    return (
        <main className="contenedor">
            {/* Pasamos el contexto global hacia las rutas anidadas en /guitarras */}
            <Outlet context={useOutletContext()} />
        </main>
    );
};

export default Tienda;
