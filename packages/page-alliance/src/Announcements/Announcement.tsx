// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import React from 'react';

import { useCidEncode } from '../useCid';

interface Props {
  className?: string
  announcement: Cid;
  index: number;
}

function Announcement ({ announcement, className, index }: Props): React.ReactElement<Props> {
  const hash = useCidEncode(announcement);

  return <tr className={className}>
    <td style={{ width: '20%' }}>
      {index}
    </td>
    <td>
      <a href={hash ? `https://ipfs.io/ipfs/${hash}` : undefined}
        rel='noopener noreferrer'
        target='_blank'>{hash}</a>
    </td>
  </tr>;
}

export default React.memo(Announcement);
