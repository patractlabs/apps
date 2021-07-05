// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { CardSummary, SummaryBox } from '@polkadot/react-components';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  accountBlacklist: string[];
  websiteBlacklist: string[];
}

function Summary ({ accountBlacklist, className = '', websiteBlacklist }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary
          className='summary-card'
          label={t<string>('Accounts')}
        >
          {accountBlacklist.length}
        </CardSummary>
        <CardSummary
          className='summary-card'
          label={t<string>('Websites')}
        >
          {websiteBlacklist.length}
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(styled(Summary)`
  & section {
    width: 100%;

    .summary-card {
      min-width: 50%;
      justify-content: flex-start;
    }
  }
`);
