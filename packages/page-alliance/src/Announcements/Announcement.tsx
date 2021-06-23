// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import React from 'react';
import styled from 'styled-components';

import { ExpanderMarkdown } from '@polkadot/react-components';

import { IPFS_GATEWAY } from '../constants';
import { useCidEncode } from '../useCid';
import { useContent } from '../useContent';

interface Props {
  className?: string
  announcement: Cid;
  index: number;
}

function Announcement ({ announcement, className }: Props): React.ReactElement<Props> {
  const hash = useCidEncode(announcement);
  const { content } = useContent(hash);

  return <tr className={className}>
    <td
      className='start overflow'
      width='35%'
    >
      <a
        className='item'
        href={hash ? `${IPFS_GATEWAY}/ipfs/${hash}` : undefined}
        rel='noopener noreferrer'
        target='_blank'
      >
          /ipfs/{hash}
      </a>
    </td>
    <td
      className='start'
      width='70%'
    >
      {content
        ? <ExpanderMarkdown content={content} />
        : '-'}
    </td>
  </tr>;
}

export default React.memo(styled(Announcement)`
  .item {
    height: 26px;
    line-height: 26px;
  }
`);
