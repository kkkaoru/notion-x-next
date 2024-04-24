import { NotionApiResponse } from '../api/notion/types';
import { NotionSearchParams } from './types';

export async function fetchNotion({ pageId }: NotionSearchParams) {
  if (pageId === undefined || pageId === '') {
    return undefined;
  }
  const response = await fetch(`http://localhost:3000/api/notion/?pageId=${pageId}`, {
    cache: 'no-cache',
  });
  return response.json() as Promise<NotionApiResponse>;
}
