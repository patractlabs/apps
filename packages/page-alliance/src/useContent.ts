// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { IPFS_GATEWAY } from './constants';

interface UseContent {
  content: string | null;
}

async function fetchData (url: string): Promise<string | null> {
  const text = await fetch(url)
    .then((response) => {
      if (response.headers.get('content-type')?.includes('text')) {
        return response.text();
      } else {
        return null;
      }
    })
    .catch((e) => console.error(e));

  return text ?? null;
}

export function useContent (cid: string | null): UseContent {
  const [content, setContent] = useState<string | null>(null);

  useEffect((): void => {
    if (cid) {
      fetchData(`${IPFS_GATEWAY}/ipfs/${cid}`).then(setContent).catch(console.error);
    }
  }, [cid]);

  return {
    content
  };
}
