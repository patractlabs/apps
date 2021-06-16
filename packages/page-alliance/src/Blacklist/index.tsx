// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { AddressSmall, Button, Columar, Input, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Add from './Add';
import Remove from './Remove';
import Summary from './Summary';

interface Props {
  accountBlacklist: string[];
  websiteBlacklist: string[];
  isMember: boolean;
  members: string[];
}

function getFiltered (list: string[], filter: string): string[] {
  if (!filter) {
    return list;
  }

  return list.filter((item, index) => {
    if (Number(filter) === index) {
      return true;
    }

    if (item.includes(filter)) {
      return true;
    }

    return false;
  });
}

function Blacklist ({ accountBlacklist, isMember, members, websiteBlacklist }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [accountFilter, setAccountFilter] = useState<string>('');
  const [websiteFilter, setWebsiteFilter] = useState<string>('');

  const accountHeader = useMemo(() => [
    [t<string>('Accounts')]
  ], [t]);
  const websiteHeader = useMemo(() => [
    [t<string>('Websites')]
  ], [t]);

  const _accountBlacklist = useMemo(() => getFiltered(accountBlacklist, accountFilter), [accountBlacklist, accountFilter]);
  const _websiteBlacklist = useMemo(() => getFiltered(websiteBlacklist, websiteFilter), [websiteBlacklist, websiteFilter]);

  return <>
    <Summary
      accountBlacklist={accountBlacklist}
      websiteBlacklist={websiteBlacklist}
    />
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
        <Table
          empty={t<string>('Account blacklist empty')}
          filter={<Input
            isFull
            label={t<string>('filter by address or index')}
            onChange={setAccountFilter}
            value={accountFilter}
          />}
          header={accountHeader}
        >
          {_accountBlacklist.map((account) => <tr key={account}>
            <td>
              <AddressSmall value={account} />
            </td>
          </tr>)}
        </Table>
      </Columar.Column>
      <Columar.Column>
        <Table
          empty={t<string>('Website blacklist empty')}
          filter={<Input
            isFull
            label={t<string>('filter by website or index')}
            onChange={setWebsiteFilter}
            value={websiteFilter}
          />}
          header={websiteHeader}
        >
          {_websiteBlacklist.map((website) => <tr key={website}>
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
