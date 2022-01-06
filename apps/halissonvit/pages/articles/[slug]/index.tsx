import { readdirSync } from 'fs';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@halissonvit/markdown';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
// import { CustomLink } from '@halissonvit/mdx-elements';
import dynamic from 'next/dynamic';

const POSTS_PATH = join(process.cwd(), process.env.ARTICLE_MARKDOWN_PATH);

const MDX_ELEMENTS = {
  Youtube: dynamic(
    async () => await import('@halissonvit/mdx-elements/youtube/youtube')
  ),
  // a: CustomLink,
};

export interface ArticlePageProps {
  slug: string;
}

export interface ArticleSchema {
  title: string;
  author: {
    name: string;
  };
  excerpt?: string;
}

export function ArticlePage({
  frontMatter,
  html,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <article className="prose lg:prose-xl">
          <h1>{frontMatter.title}</h1>
          <div>by {frontMatter.author.name}</div>

          <MDXRemote {...html} components={MDX_ELEMENTS} />
        </article>
      </div>
    </div>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: ArticlePageProps;
}) => {
  const { frontMatter, content } = getParsedFileContentBySlug<ArticleSchema>(
    params.slug,
    POSTS_PATH
  );
  const parsedContent = await renderMarkdown(content);

  return {
    props: {
      frontMatter,
      slug: params.slug,
      html: parsedContent,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = readdirSync(POSTS_PATH).map((path) => {
    const slug = path.replace(/\.mdx?$/, '');

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ArticlePage;
