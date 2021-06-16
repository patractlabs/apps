// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { Button, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
}

function Nominate ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [nominator, setNominator] = useState<string | null>(null);

  return <>
    <Button
      className={className}
      icon='plus'
      label={t<string>('Nominate candidacy')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Nominate candidacy')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              help={t<string>('This account will be use to nominate candidacy.')}
              label={t<string>('Nominate account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              help={t<string>('xxx')}
              label={t<string>('Nominator')}
              onChange={setNominator}
              type='account'
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Nominate candidacy')}
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
