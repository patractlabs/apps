// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Button, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Candidate from './Candidate';
import Nominate from './Nominate';
import Submit from './Submit';

interface Props {
  className?: string;
  candidates: string[];
  favorites: string[];
  isMember: boolean;
  toggleFavorite: (address: string) => void;
}

function Candidates ({ candidates, favorites, isMember, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Candidates'), 'start', 2],
    [t('Website'), 'start'],
    [undefined, undefined]
  ], [t]);

  return <>
    <Button.Group>
      <Submit />
      <Nominate />
    </Button.Group>
    <Table
      empty={t<string>('No candidates')}
      header={header}
    >
      {candidates.map((candidate) => <Candidate
        candidate={candidate}
        isFavorite={favorites.includes(candidate)}
        isMember={isMember}
        key={candidate}
        toggleFavorite={toggleFavorite}
      />)}
    </Table>
  </>;
}

export default React.memo(Candidates);
