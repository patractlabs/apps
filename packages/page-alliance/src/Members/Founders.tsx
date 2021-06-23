// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Founder from './Founder';

interface Props {
  className?: string
  founders: string[]
  favorites: string[];
  isMember: boolean;
  members: string[];
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Founders ({ className = '', favorites, founders, isMember, members, onRetire, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Founders'), 'start account'],
    [t('Website'), 'start website', undefined],
    [t('Deposit'), 'start deposit'],
    [undefined, undefined, undefined]
  ], [t]);

  return <Table
    className={className}
    empty={t<string>('No founders')}
    header={header}
  >
    {founders.map((founder) => <Founder
      founder={founder}
      isFavorite={favorites.includes(founder)}
      isMember={isMember}
      key={founder}
      members={members}
      onRetire={onRetire}
      toggleFavorite={toggleFavorite}
    />)}
  </Table>;
}

export default React.memo(styled(Founders)`
  tr .account {
    width: 35%;
  }

  tr .website {
    width: 32%;
  }

  tr .deposite {
    width: 17%;
  }
`);
