// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Motion from './Motion';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
  motions?: DeriveCollectiveProposal[];
}

function Motions ({ className, isMember, members, motions }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('motions'), 'start', 2],
    [t('threshold')],
    [t('voting end')],
    [],
    [undefined, undefined]
  ], [t]);

  return <Table
    className={className}
    empty={motions && t<string>('No motions')}
    header={header}
  >
    {motions?.map((motion: DeriveCollectiveProposal): React.ReactNode => (
      <Motion
        isMember={isMember}
        key={motion.hash.toHex()}
        members={members}
        motion={motion}
      />
    ))}
  </Table>;
}

export default React.memo(Motions);
