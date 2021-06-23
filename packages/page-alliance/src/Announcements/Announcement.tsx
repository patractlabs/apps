// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import React from 'react';
import styled from 'styled-components';

import { ExpanderMarkdown } from '@polkadot/react-components';

import { useCidEncode } from '../useCid';
import { useContent } from '../useContent';

interface Props {
  className?: string
  announcement: Cid;
  index: number;
}

function Announcement ({ announcement, className, index }: Props): React.ReactElement<Props> {
  const hash = useCidEncode(announcement);
  const { content } = useContent(hash);

  return <tr className={className}>
    <td style={{ width: '10%' }}>
      <div className='item'>
        {index}
      </div>
    </td>
    <td className='overflow'>
      <div className='item'>
        <a href={hash ? `https://ipfs.io/ipfs/${hash}` : undefined}
          rel='noopener noreferrer'
          target='_blank'>{hash}</a>
      </div>
    </td>
    <td
      className='expand'
      width='60%'
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
