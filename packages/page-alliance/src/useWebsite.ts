// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/types/codec';
import type { AccountId, Registration } from '@polkadot/types/interfaces';

import { useApi, useCall } from '@polkadot/react-hooks';

export function useWebsite (accountId: AccountId | string): string {
  const { api } = useApi();
  const identity = useCall<Option<Registration>>(api.query.identity.identityOf, [accountId]);

  return identity?.unwrap().info.web.value.toHuman() as string || '';
}
