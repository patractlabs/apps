// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { AddressSmall, Button, Columar, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Add from './Add';
import Remove from './Remove';

interface Props {
  accountBlacklist: string[];
  websiteBlacklist: string[];
  isMember: boolean;
  members: string[];
}

function Blacklist ({ accountBlacklist, isMember, members, websiteBlacklist }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const accountHeader = useMemo(() => [
    [t<string>('Accounts')]
  ], [t]);
  const websiteHeader = useMemo(() => [
    [t<string>('Websites')]
  ], [t]);

  return <>
    <Button.Group>
      <Add
        isMember={isMember}
        members={members}
      />
      <Remove
        accountBlacklist={accountBlacklist}
        isMember={isMember}
        members={members}
        websiteBlacklist={websiteBlacklist}
      />
    </Button.Group>
    <Columar>
      <Columar.Column>
        <Table header={accountHeader}>
          {accountBlacklist.map((account) => <tr key={account}>
            <td>
              <AddressSmall value={account} />
            </td>
          </tr>)}
        </Table>
      </Columar.Column>
      <Columar.Column>
        <Table header={websiteHeader}>
          {websiteBlacklist.map((website) => <tr key={website}>
            <td>
              <a
                href={website}
                rel='noopener noreferrer'
                target='_blank'
              >
                {website}
              </a>
            </td>
          </tr>)}
        </Table>
      </Columar.Column>
    </Columar>
  </>;
}

export default React.memo(Blacklist);
