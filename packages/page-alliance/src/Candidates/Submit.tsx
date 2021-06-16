// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { Button, InputAddress, InputBalance, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
}

function Submit ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);

  return <>
    <Button
      className={className}
      icon='plus'
      label={t<string>('Submit candidacy')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Submit candidacy')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              help={t<string>('This account will be use to submit candidacy.')}
              label={t<string>('submit account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('The bond will be reserved for the duration of your candidacy and membership.')}>
            <InputBalance
              defaultValue={api.consts.alliance.candidateDeposit}
              help={t<string>('The bond that is reserved')}
              isDisabled
              label={t<string>('candidacy bond')}
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
