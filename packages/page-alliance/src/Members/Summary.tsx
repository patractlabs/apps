// Copyright 2017-2021 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  allies: number;
  className?: string;
  founders: number;
  fellows: number;
}

function Summary ({ allies, className = '', fellows, founders }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <section className='section-main'>
        <CardSummary label={t<string>('founders')}>
          {formatNumber(founders)}
        </CardSummary>
        <CardSummary label={t<string>('fellows')}>
          {formatNumber(fellows)}
        </CardSummary>
        <CardSummary label={t<string>('allies')}>
          {formatNumber(allies)}
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(styled(Summary)`
   & > .section-main {
    width: 58%;
    justify-content: space-between;
   }
`);
