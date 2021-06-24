// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Fellow from './Fellow';

interface Props {
  className?: string
  fellows: string[]
  favorites: string[];
  isMember: boolean;
  members: string[];
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Fellows ({ className = '', favorites, fellows, isMember, members, onRetire, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Fellows'), 'start account', 1],
    [t('Website'), 'start website', undefined],
    [t('Deposit'), 'start deposit'],
    [undefined, undefined, undefined]
  ], [t]);

  return <Table
    className={className}
    empty={t<string>('No fellows')}
    header={header}
  >
    {fellows.map((fellow) => <Fellow
      fellow={fellow}
      isFavorite={favorites.includes(fellow)}
      isMember={isMember}
      key={fellow}
      members={members}
      onRetire={onRetire}
      toggleFavorite={toggleFavorite}
    />)}
  </Table>;
}

export default React.memo(styled(Fellows)`
  tr .account {
    width: 35%;
  }

  tr .website {
    width: 30%;
  }

  tr .deposit {
    width: 17%;
  }
`);
