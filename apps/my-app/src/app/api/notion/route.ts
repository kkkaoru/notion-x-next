import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

interface ParseParamsArgs {
  request: Request;
  name: string;
}

function parseParams({ request, name }: ParseParamsArgs): string {
  const param = new URL(request.url).searchParams.get(name);
  if (param === '' || param === null) {
    throw new Error(`Missing ${name} parameter`);
  }
  return param;
}

async function retrievePageAndBlocks(pageId: string) {
  const notion = new Client({ auth: process.env.NOTION_API_TOKEN, baseUrl: process.env.NOTION_API_BASE_URL });
  const n2m = new NotionToMarkdown({
    notionClient: notion,
    config: {
      separateChildPage: true, // default: false
    },
  });
  // const mdblocks = await n2m.pageToMarkdown(pageId);
  // const markdown = await n2m.pageToMarkdown(pageId);
  // const markdown = n2m.toMarkdownString(mdblocks);
  const [page, list] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
    // n2m.pageToMarkdown(pageId),
    // n2m.toMarkdownString(mdblocks),
    // n2m.pageToMarkdown(pageId).then((blocks) => n2m.toMarkdownString(blocks)),
  ]);
  const markdown = await n2m.blocksToMarkdown(list.results);
  return { page, blocks: list.results, markdown };
}

export async function GET(request: Request) {
  const pageId = parseParams({ request, name: 'pageId' });
  const { page, blocks, markdown } = await retrievePageAndBlocks(pageId);
  return Response.json({ page, blocks, markdown });
}
