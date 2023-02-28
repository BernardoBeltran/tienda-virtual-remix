import { Outlet } from "@remix-run/react";
import styles from "~/styles/blog.css";

// Importar los estilos CSS para el layout del blog
export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles,
        },
    ];
}

const Blog = () => {
    return (
        <main className="contenedor">
            <Outlet />
        </main>
    );
};

export default Blog;
