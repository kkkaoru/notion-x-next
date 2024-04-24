import Link from 'next/link';

import { NotionSearchParams } from './types';
import { NotionDataRender } from './client';

interface NotionProps {
  params: { slug: string };
  searchParams: NotionSearchParams;
}

export default function Notion({ searchParams }: NotionProps) {
  const pageId = searchParams.pageId;

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly p-24'>
      <div className='flex'>
        <span className='text-xl'>HELLO NOTION</span>
      </div>
      <dl>
        <div>
          <dt>page id:</dt>
          <dd>{pageId}</dd>
        </div>
      </dl>
      <NotionDataRender pageId={pageId} />
      <div>
        <Link href='/' className='px-4'>
          TO TOP
        </Link>
      </div>
    </main>
  );
}
