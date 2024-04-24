import { Client } from '@notionhq/client';

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
  const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
  const [page, list] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);
  return { page, blocks: list.results };
}

export async function GET(request: Request) {
  const pageId = parseParams({ request, name: 'pageId' });
  const { page, blocks } = await retrievePageAndBlocks(pageId);
  return Response.json({ page, blocks });
}
