import { useLoaderData } from "@remix-run/react";
import ListadoPosts from "~/components/listado-posts";
import { getPosts } from "~/models/posts.server";

export function meta() {
    return {
        title: "GuitarCO - Blog",
        description: "GuitarCO - Blog de música y venta de guitarras",
    };
}

// Obtener posts desde la API
export async function loader() {
    const posts = await getPosts();

    return posts.data;
}

const Blog = () => {
    const posts = useLoaderData();

    return <ListadoPosts posts={posts} />;
};

export default Blog;
