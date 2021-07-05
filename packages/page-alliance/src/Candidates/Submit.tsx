// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import { Button, InputAddress, InputBalance, Modal, TxButton } from '@polkadot/react-components';
import { useAccounts, useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
}

function Submit ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const { allAccounts } = useAccounts();
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(allAccounts.map((account) => api.derive.accounts.info(account)))
      .then((accountInfos) => {
        setAccounts(allAccounts.filter((_, index) => (accountInfos[index].identity.web && accountInfos[index].identity.judgements.length > 0)));
      })
      .catch(console.error);
  }, [allAccounts, api]);

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={accounts.length === 0}
      label={t<string>('Submit candidacy')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('submit your alliance candidacy')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('This account will become a candidate and be responsible for the deposit. This account shouldn\'t already be a member or in the blacklist.')}>
            <InputAddress
              filter={accounts}
              help={t<string>('Select the account you wish to submit for the candidate.')}
              label={t<string>('submit with account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('The deposit will be reserved for the duration of your candidacy and membership. If the candidate is rejected or kicked out from the members in the future, the deposit will be slashed. ')}>
            <InputBalance
              defaultValue={api.consts.alliance.candidateDeposit}
              // help={t<string>('The bond that is reserved')}
              isDisabled
              label={t<string>('candidacy deposit')}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Submit')}
            onStart={toggleVisible}
            tx={api.tx.alliance.submitCandidacy}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Submit);
