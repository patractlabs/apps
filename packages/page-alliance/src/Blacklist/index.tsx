// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { AddressSmall, Button, Columar, Input, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Add from './Add';
import Remove from './Remove';
// import Summary from './Summary';

interface Props {
  className?: string;
  accountBlacklist: string[];
  websiteBlacklist: string[];
  isMember: boolean;
  members: string[];
}

function getFiltered (list: string[], filter: string): string[] {
  if (!filter) {
    return list;
  }

  return list.filter((item) => {
    // if (Number(filter) === index) {
    //   return true;
    // }

    if (item.includes(filter)) {
      return true;
    }

    return false;
  });
}

function Blacklist ({ accountBlacklist, className = '', isMember, members, websiteBlacklist }: Props): React.ReactElement<Props> {
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

  return <div className={className}>
    {/* <Summary
      accountBlacklist={accountBlacklist}
      websiteBlacklist={websiteBlacklist}
    /> */}
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
            label={t<string>('filter by address or identity')}
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
            label={t<string>('filter by website')}
            onChange={setWebsiteFilter}
            value={websiteFilter}
          />}
          header={websiteHeader}
        >
          {_websiteBlacklist.map((website) => <tr key={website}>
            <td>
              <div className='website-item'>
                <a
                  href={website}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {website}
                </a>
              </div>
            </td>
          </tr>)}
        </Table>
      </Columar.Column>
    </Columar>
  </div>;
}

export default React.memo(styled(Blacklist)`
  tr td .website-item {
    height: 26px;
    line-height: 26px;
  }
`);
