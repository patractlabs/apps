// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { InputAddress, Menu, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  address: string;
}

function Kick ({ address, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isOpen, toggleOpen] = useToggle();

  const proposal = useMemo(() => api.tx.alliance.kickMember(address), [address, api.tx.alliance]);

  return <>
    {isOpen && (
      <Modal
        className={className}
        header={t<string>('Submit kicking proposal')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('This account will make the proposal and be responsible for the bond.')}>
            <InputAddress
              help={t<string>('Select the account you wish to submit the proposal from.')}
              label={t<string>('submit with account')}
              onChange={setAccountId}
              type='account'
              withLabel
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('The account will be kick out.')}>
            <InputAddress
              help={t<string>('xxx')}
              label={t<string>('xxx')}
              type='allPlus'
              value={address}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleOpen}>
          <TxButton
            accountId={accountId}
            icon='plus'
            isDisabled={!accountId}
            label={t<string>('Submit proposal')}
            onStart={toggleOpen}
            params={[proposal]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
    <Menu.Item
      onClick={toggleOpen}
    >
      {t('Propose kicking out')}
    </Menu.Item>
  </>;
}

export default React.memo(Kick);
