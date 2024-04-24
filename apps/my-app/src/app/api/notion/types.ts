import type { BlockObjectResponse, GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

export interface NotionApiResponse {
  page: GetPageResponse;
  blocks: BlockObjectResponse[];
}
