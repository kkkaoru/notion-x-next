import { NotionSearchParams } from './types';
import { Suspense, use } from 'react';
import { fetchNotion } from './fetch';
import { Render, type NotionBlock } from '@9gustin/react-notion-render';

export function NotionDataRender({ pageId }: NotionSearchParams) {
  const result = use(fetchNotion({ pageId }));
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Needs convert NotionBlock */}
        {result !== undefined && <Render blocks={result.blocks as unknown as NotionBlock[]} />}
      </Suspense>
      <pre className='whitespace-pre-wrap'>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
