import { NotionApiResponse } from '../api/notion/types';
import { NotionSearchParams } from './types';

export async function fetchNotion({ pageId }: NotionSearchParams) {
  if (pageId === undefined || pageId === '') {
    return undefined;
  }
  const response = await fetch(`http://localhost:3333/api/notion/?pageId=${pageId}`, {
    cache: 'no-cache',
  });
  const result = (await response.json()) as Promise<NotionApiResponse>;
  return { ...result };
}
