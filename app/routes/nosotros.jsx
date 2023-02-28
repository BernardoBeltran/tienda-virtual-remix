import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
    return {
        title: "GuitarCO - Nosotros",
        description: "Venta de guitarras, blog de música",
    };
}

export function links() {
    return [
        {
            rel: "stylesheet",
            href: styles,
        },
        {
            rel: "preload",
            href: imagen,
            as: "image",
        },
    ];
}

const Nosotros = () => {
    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>

            <div className="contenido">
                <img src={imagen} alt="Imagen Sobre Nosotros" />
                <div>
                    <p>
                        quae sint optio? Numquam eaque saepe autem porro beatae,
                        magnam eligendi voluptate doloremque exercitationem!
                        Voluptate explicabo ad quasi! Eum illum suscipit
                        excepturi saepe eius voluptatibus, quam laboriosam quo
                        ut, atque, voluptate incidunt voluptas.
                    </p>
                    <p>
                        quae sint optio? Numquam eaque saepe autem porro beatae,
                        magnam eligendi voluptate doloremque exercitationem!
                        Voluptate explicabo ad quasi! Eum illum suscipit
                        excepturi saepe eius voluptatibus, quam laboriosam quo
                        ut, atque, voluptate incidunt voluptas.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Nosotros;
