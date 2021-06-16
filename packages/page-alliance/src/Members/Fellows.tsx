// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Fellow from './Fellow';

interface Props {
  className?: string
  fellows: string[]
  favorites: string[];
  isMember: boolean;
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Fellows ({ className = '', favorites, fellows, isMember, onRetire, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Fellows'), 'start'],
    [t('Website'), 'start', undefined],
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
      onRetire={onRetire}
      toggleFavorite={toggleFavorite}
    />)}
  </Table>;
}

export default React.memo(Fellows);
