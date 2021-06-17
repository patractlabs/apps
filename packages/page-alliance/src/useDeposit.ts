// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/types/codec';
import type { AccountId } from '@polkadot/types/interfaces';

import BN from 'bn.js';

import { useApi, useCall } from '@polkadot/react-hooks';
import { Balance } from '@polkadot/types/interfaces';
import { formatBalance, isUndefined } from '@polkadot/util';

function reformat (value?: string | BN, isDisabled?: boolean, siDecimals?: number): string | undefined {
  if (!value) {
    return undefined;
  }

  const decimals = isUndefined(siDecimals)
    ? formatBalance.getDefaults().decimals
    : siDecimals;
  const si = isDisabled
    ? formatBalance.calcSi(value.toString(), decimals)
    : formatBalance.findSi('-');

  return formatBalance(value, { decimals, forceUnit: si.value, withSi: false }).replace(',', isDisabled ? ',' : '');
}

export function useDeposit (accountId: AccountId | string): Balance | undefined {
  const { api } = useApi();
  const balance = useCall<Option<Balance>>(api.query.alliance.depositOf, [accountId]);

  if (!balance || balance.isEmpty) {
    return;
  }

  // console.log('balance', balance.toString(), reformat(balance.unwrap()), reformat(balance.unwrap()))
  return balance.unwrap();
}
