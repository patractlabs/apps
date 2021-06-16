// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';

import { useTranslation } from '../translate';

interface Props {
  accountBlacklist: string[];
  websiteBlacklist: string[];
}

function Summary ({ accountBlacklist, websiteBlacklist }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('Accounts')}>
          {accountBlacklist.length}
        </CardSummary>
        <CardSummary label={t<string>('Websites')}>
          {websiteBlacklist.length}
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
