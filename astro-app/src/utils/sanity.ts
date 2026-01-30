import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
      _id,
      _type,
      _createdAt,
      title,
      slug,
      excerpt,
      mainImage{
        ...,
        asset->
      }
    }`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _type,
      _createdAt,
      title,
      slug,
      excerpt,
      mainImage{
        ...,
        asset->
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}
