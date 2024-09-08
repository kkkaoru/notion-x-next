import type { BlockObjectResponse, GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import type { MdStringObject } from 'notion-to-md/build/types';
export interface NotionApiResponse {
  page: GetPageResponse;
  blocks: BlockObjectResponse[];
  markdown: MdStringObject;
}
