// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId } from '@polkadot/types/interfaces';

import { useMemo } from 'react';

import { useAccounts, useApi, useCall } from '@polkadot/react-hooks';

interface Result {
  allies: string[];
  count: number;
  fellows: string[];
  founders: string[]
  isMember: boolean;
  isFellow: boolean;
  isFounder: boolean;
}

const transformMembers = {
  transform: (accounts: AccountId[]) => accounts.map((accountId) => accountId.toString())
};

export function useMembers (): Result {
  const { api } = useApi();
  const { allAccounts, hasAccounts } = useAccounts();
  const founders = useCall<string[]>(hasAccounts && api.query.alliance.members, ['Founder'], transformMembers);
  const fellows = useCall<string[]>(hasAccounts && api.query.alliance.members, ['Fellow'], transformMembers);
  const allies = useCall<string[]>(hasAccounts && api.query.alliance.members, ['Ally'], transformMembers);

  return useMemo(() => ({
    allies: allies || [],
    count: (founders?.length || 0) + (fellows?.length || 0) + (allies?.length || 0),
    fellows: fellows || [],
    founders: founders || [],
    isFellow: (fellows || []).some((accountId) => allAccounts.includes(accountId)),
    isFounder: (founders || []).some((accountId) => allAccounts.includes(accountId)),
    isMember: (founders || []).concat(fellows || []).some((accountId) => allAccounts.includes(accountId))
  }), [allAccounts, allies, fellows, founders]);
}
