// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { AddressSmall } from '@polkadot/react-components';

import { useDeposit } from '../useDeposit';
import { useWebsite } from '../useWebsite';
import Propose from './Propose';

interface Props {
  className?: string;
  candidate: string;
  isFavorite: boolean;
  isMember: boolean;
  members: string[];
  toggleFavorite: (address: string) => void;
}

function Candidate ({ candidate, className, isMember, members }: Props): React.ReactElement<Props> {
  const website = useWebsite(candidate);
  const deposite = useDeposit(candidate);

  return <tr className={className}>
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
    <td className='start'>
      {
        deposite
      }
    </td>
    <td className='button'>
      <Propose
        candidate={candidate}
        isMember={isMember}
        members={members}
      />
    </td>
  </tr>;
}

export default React.memo(Candidate);
