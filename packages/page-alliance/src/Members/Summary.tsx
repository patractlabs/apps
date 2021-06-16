// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Rule from './Rule';

interface Props {
  className?: string;
  rule: string | null;
}

function Summary ({ className, rule }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t<string>('Alliance rule')],
    []
  ], [t]);

  return <Table
    className={className}
    empty={t<string>('No rule')}
    header={header}
  >
    <tr>
      <td className='start'>
        <a
          href={rule ? `https://ipfs.io/ipfs/${rule}` : ''}
          rel='noopener noreferrer'
          target='_blank'
        >
          {rule}
        </a>
      </td>
      <td className='button'>
        <Rule />
      </td>
    </tr>
  </Table>;
}

export default React.memo(Summary);
