// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { Button, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
}

function Nominate ({ className, isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [nominator, setNominator] = useState<string | null>(null);

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={!isMember}
      label={t<string>('Nominate candidacy')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('nominate an alliance candidacy')}
        onClose={toggleVisible}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The alliance founder or fellow accounts for the proposal. The selection is filtered by the current accounts with proposing rights.')}>
            <InputAddress
              filter={members}
              help={t<string>('Select the account you wish to submit the nomination from.')}
              label={t<string>('submit with account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('This account will be nominated as a candidate without the need of deposit compared with submitting candidacy by itself.')}>
            <InputAddress
              help={t<string>('The account you wish to be nominated to candidate.')}
              label={t<string>('candidate account')}
              onChange={setNominator}
              type='account'
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Submit proposal')}
            onStart={toggleVisible}
            params={[nominator]}
            tx={api.tx.alliance.nominateCandidacy}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Nominate);
