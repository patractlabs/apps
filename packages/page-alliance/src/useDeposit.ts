// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/types/codec';
import type { AccountId } from '@polkadot/types/interfaces';

import { useApi, useCall } from '@polkadot/react-hooks';
import { Balance } from '@polkadot/types/interfaces';

export function useDeposit (accountId: AccountId | string): Balance | undefined {
  const { api } = useApi();
  const balance = useCall<Option<Balance>>(api.query.alliance.depositOf, [accountId]);

  if (!balance || balance.isEmpty) {
    return;
  }

  return balance.unwrap();
}
