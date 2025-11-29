// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
export const client = createClient({
    projectId: "awx2z0dv", // ✅ your real project ID
    dataset: "blogs",
    apiVersion: "2023-01-01",
    useCdn: false,
});
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
