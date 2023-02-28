import { useState, useEffect } from "react";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link,
} from "@remix-run/react";
import Header from "~/components/header";
import styles from "~/styles/index.css";
import Footer from "~/components/footer";

// Información para SEO
export function meta() {
    return {
        title: "GuitarCO - Tienda Online de Guitarras",
        charset: "uft-8",
        viewport: "width=device-width,initial-scale=1",
    };
}

// Estilos CSS
export function links() {
    return [
        // Normalize CSS
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
        },

        // Fuente 'Outfit' desde Google Fonts
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
        },

        // Estilos generales para toda la aplicación:
        {
            rel: "stylesheet",
            href: styles,
        },
    ];
}

export default function App() {
    /**
     * Obtenemos desde LS el carrito, si es null o undefined,
     * entonces devuelve un arreglo vacío que se define como etado inicial
     * Además, valida que exista el objeto window, para evitar conflicto con remix
     * que no cuenta con LS entonces devuelve null, caso contrario utiliza LS
     */
    const carritoLocalStorage =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("carrito")) ?? []
            : null;
    const [carrito, setCarrito] = useState(carritoLocalStorage);

    // Guardar en LS el carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Agregar una guitarra al carrito
    const agregarCarrito = (guitarra) => {
        // Evitar registros duplicados, si ya existe una guitarra con id igual
        if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map((guitarraState) => {
                if (guitarraState.id === guitarra.id) {
                    // Reescribir unicamente la propiedad de cantidad
                    guitarraState.cantidad = guitarra.cantidad;
                }

                return guitarraState;
            });

            // Añadir el objeto actualizado al carrito
            setCarrito(carritoActualizado);
        } else {
            // Caso contrario, agregar al carrito un registro adicional
            setCarrito([...carrito, guitarra]);
        }
    };

    // Actualizar la cantidad seleccionada de cada guitarra en el carrito
    const actualizarCantidad = (guitarra) => {
        const carritoActualizado = carrito.map((guitarraState) => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad;
            }

            return guitarraState;
        });

        setCarrito(carritoActualizado);
    };

    // Eliminar una guitarra del carrito
    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito.filter(
            (guitarraState) => guitarraState.id !== id
        );
        setCarrito(carritoActualizado);
    };

    return (
        <Document>
            <Outlet
                context={
                    // Contexto Global
                    {
                        agregarCarrito,
                        carrito,
                        actualizarCantidad,
                        eliminarGuitarra,
                    }
                }
            />
        </Document>
    );
}

function Document({ children }) {
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>

            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

// Componentes para el manejo de errores
export function CatchBoundary() {
    const error = useCatch();

    return (
        <Document>
            <p className="error">
                {error.status} {error.statusText}
            </p>
            <Link to="/" className="error-enlace">
                ⬅️ Regresar a la página principal
            </Link>
        </Document>
    );
}

export function ErrorBoundary({ error }) {
    return (
        <Document>
            <p className="error">
                {error.status} {error.statusText}
            </p>
            <Link to="/" className="error-enlace">
                ⬅️ Regresar a la página principal
            </Link>
        </Document>
    );
}
