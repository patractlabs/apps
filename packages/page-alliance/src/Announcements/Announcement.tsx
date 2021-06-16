// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import React from 'react';

import { useCidEncode } from '../useCid';

interface Props {
  className?: string
  announcement: Cid;
}

function Announcement ({ announcement, className }: Props): React.ReactElement<Props> {
  const hash = useCidEncode(announcement);

  return <tr className={className}>
    <td>
      <a href={hash ? `https://ipfs.io/ipfs/${hash}` : undefined}
        rel='noopener noreferrer'
        target='_blank'>{hash}</a>
    </td>
  </tr>;
}

export default React.memo(Announcement);
