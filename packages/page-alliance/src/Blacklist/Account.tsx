// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { AddressSmall } from '@polkadot/react-components';
import { useAccountInfo } from '@polkadot/react-hooks';

interface Props {
  account: string;
  filter: string;
  index: number;
}

function Account ({ account, filter, index }: Props): React.ReactElement<Props> | null {
  const { identity, name } = useAccountInfo(account);

  const visible = useMemo(() =>
    !filter ||
    filter === `${index}` ||
    name.toLowerCase().includes(filter.toLowerCase()) ||
    account.toLowerCase().includes(filter.toLowerCase()) ||
    (identity && identity.display?.toLocaleLowerCase().includes(filter.toLocaleLowerCase())),
  [account, filter, index, identity, name]
  );

  if (!visible) {
    return null;
  }

  return (
    <tr>
      <td>
        <AddressSmall value={account} />
      </td>
    </tr>
  );
}

export default React.memo(Account);
