// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';

import { AddressSmall, Icon } from '@polkadot/react-components';

import { useWebsite } from '../useWebsite';
import Propose from './Propose';

interface Props {
  className?: string;
  candidate: string;
  isFavorite: boolean;
  isMember: boolean;
  toggleFavorite: (address: string) => void;
}

function Candidate ({ candidate, className, isFavorite, isMember, toggleFavorite }: Props): React.ReactElement<Props> {
  const website = useWebsite(candidate);

  const _onFavorite = useCallback(() => toggleFavorite(candidate), [candidate, toggleFavorite]);

  return <tr className={className}>
    <td className='favorite'>
      <Icon
        color={isFavorite ? 'orange' : 'gray'}
        icon='star'
        onClick={_onFavorite}
      />
    </td>
    <td className='address'><AddressSmall value={candidate} /></td>
    <td className='start'>
      <a
        href={website}
        rel='noopener noreferrer'
        target='_blank'
      >
        {website}
      </a>
    </td>
    <td className='button'>
      <Propose
        candidate={candidate}
        isMember={isMember}
      />
    </td>
  </tr>;
}

export default React.memo(Candidate);
