// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Founder from './Founder';

interface Props {
  className?: string
  founders: string[]
  favorites: string[];
  isMember: boolean;
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Founders ({ className = '', favorites, founders, isMember, onRetire, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Founders'), 'start'],
    [t('Website'), 'start', undefined],
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
      onRetire={onRetire}
      toggleFavorite={toggleFavorite}
    />)}
  </Table>;
}

export default React.memo(Founders);
