// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Button, Columar, Input, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Account from './Account';
import Add from './Add';
import Remove from './Remove';

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

  const _websiteBlacklist = useMemo(() => getFiltered(websiteBlacklist, websiteFilter), [websiteBlacklist, websiteFilter]);

  return <div className={className}>

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
          {
            accountBlacklist.map((account, index) =>
              <Account
                account={account}
                filter={accountFilter}
                key={`${index}:${account}`}
              />
            )
          }
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
