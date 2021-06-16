// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Ally from './Ally';

interface Props {
  className?: string
  allies: string[]
  favorites: string[];
  isMember: boolean;
  members: string[];
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Allies ({ allies, className = '', favorites, isMember, members, onRetire, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Allies'), 'start'],
    [t('Website'), 'start', undefined],
    [undefined, undefined, undefined]
  ], [t]);

  return <Table
    className={className}
    empty={t<string>('No allies')}
    header={header}
  >
    {allies.map((ally) => <Ally
      ally={ally}
      isFavorite={favorites.includes(ally)}
      isMember={isMember}
      key={ally}
      members={members}
      onRetire={onRetire}
      toggleFavorite={toggleFavorite}
    />)}
  </Table>;
}

export default React.memo(Allies);
