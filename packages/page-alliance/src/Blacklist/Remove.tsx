// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Button, InputAddress, InputAddressMulti, InputTextMulti, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  accountBlacklist: string[];
  websiteBlacklist: string[];
  isMember: boolean;
  members: string[];
}

function Remove ({ accountBlacklist, className, isMember, members, websiteBlacklist }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);

  const proposal = useMemo(() => api.tx.alliance.removeBlacklist(
    accounts.map<any>((account) => ({ AccountId: account })).concat(
      websites.map((website) => ({ Website: website }))
    )
  ), [accounts, api.tx.alliance, websites]);

  return <>
    <Button
      className={className}
      icon='minus'
      isDisabled={!isMember}
      label={t<string>('Remove blacklist')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Propose blacklist')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              filter={members}
              help={t<string>('xxx')}
              label={t<string>('xxx')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={
            <>
              <p>{t<string>('xxx')}</p>
              <p>{t<string>('xxx')}</p>
            </>
          }>
            <InputTextMulti
              available={websiteBlacklist}
              availableLabel={t<string>('website blacklist')}
              help={t<string>('xxx')}
              maxCount={10}
              onChange={setWebsites}
              valueLabel={t<string>('selected')}
            />
          </Modal.Columns>
          <Modal.Columns hint={
            <>
              <p>{t<string>('xxx')}</p>
              <p>{t<string>('xxx')}</p>
            </>
          }>
            <InputAddressMulti
              available={accountBlacklist}
              availableLabel={t<string>('account blacklist')}
              help={t<string>('xxx')}
              maxCount={10}
              onChange={setAccounts}
              valueLabel={t<string>('selected')}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId || (accounts.length + websites.length === 0)}
            label={t<string>('Submit proposal')}
            onStart={toggleVisible}
            params={[proposal]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Remove);
