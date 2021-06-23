// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { StatusContext } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import Allies from './Allies';
import Fellows from './Fellows';
import Founders from './Founders';
import Rules from './Rules';
import Summary from './Summary';

interface Props {
  className?: string;
  allies: string[];
  fellows: string[];
  founders: string[];
  isMember: boolean;
  members: string[];
  rule: string | null;
  favorites: string[]
  toggleFavorite: (address: string) => void;
}

function Members ({ allies, className = '', favorites, fellows, founders, isMember, members, rule, toggleFavorite }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const { queueExtrinsic } = useContext(StatusContext);

  const onRetire = useCallback((accountId: string) => {
    const extrinsic: SubmittableExtrinsic<'promise'> = api.tx.alliance.retire();

    queueExtrinsic({
      accountId,
      extrinsic
    });
  }, [api.tx.alliance, queueExtrinsic]);

  return (
    <div className={className}>
      <Summary
        allies={allies.length}
        fellows={fellows.length}
        founders={founders.length}
      />
      <Rules
        className='ui--AllianceMember-table'
        isMember={isMember}
        members={members}
        rule={rule}
      />
      <Founders
        className='ui--AllianceMember-table'
        favorites={favorites}
        founders={founders}
        isMember={isMember}
        members={members}
        onRetire={onRetire}
        toggleFavorite={toggleFavorite}
      />
      <Fellows
        className='ui--AllianceMember-table'
        favorites={favorites}
        fellows={fellows}
        isMember={isMember}
        members={members}
        onRetire={onRetire}
        toggleFavorite={toggleFavorite}
      />
      <Allies
        allies={allies}
        className='ui--AllianceMember-table'
        favorites={favorites}
        isMember={isMember}
        members={members}
        onRetire={onRetire}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

const StyledMembers: React.FC<Props> = styled(Members)`
  .ui--AllianceMember-table table tr > td:nth-of-type(1) {
    width: 35%;
  }
`;

export default React.memo(StyledMembers);
