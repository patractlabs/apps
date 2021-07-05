// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountRegistration } from '@polkadot/api-derive/types';
import type { AccountId } from '@polkadot/types/interfaces';

import { useApi, useCall } from '@polkadot/react-hooks';

export function useWebsite (accountId: AccountId | string): string {
  const { api } = useApi();
  const identity = useCall<DeriveAccountRegistration>(api.derive.accounts.identity, [accountId]);

  return identity?.web ?? '';
}
