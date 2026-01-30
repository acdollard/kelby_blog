import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

export const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityAsset) {
  return builder.image(source);
}
