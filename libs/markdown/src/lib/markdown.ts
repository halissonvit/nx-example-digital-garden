import { readFileSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import * as matter from 'gray-matter';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getParsedFileContentBySlug<T extends {}>(
  filename: string,
  postsPath: string
) {
  const postFilePath = join(postsPath, `${filename}.mdx`);
  const fileContent = readFileSync(postFilePath);

  // Very weird case where TS doesn't recognize matter as a callable? Probably an issue with gray-matter, but well...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, content } = (matter as any)(fileContent);

  return {
    frontMatter: data as T,
    content: content as string,
  };
}

export function renderMarkdown(markdown: string) {
  return serialize(markdown || '');
}
