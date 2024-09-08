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
        {result !== undefined && (
          <>
            <div>---</div>
            {/* <Render blocks={result.blocks as unknown as NotionBlock[]} /> */}
            <pre className='whitespace-pre-wrap'>{JSON.stringify(result.markdown, null, 2)}</pre>
            {/* <pre className='whitespace-pre-wrap'>{JSON.stringify('foo', null, 2)}</pre> */}
            <div>---</div>
          </>
        )}
      </Suspense>
      {/* <pre className='whitespace-pre-wrap'>{JSON.stringify(result, null, 2)}</pre> */}
    </div>
  );
}
