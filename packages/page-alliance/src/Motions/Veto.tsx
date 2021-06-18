// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { Proposal } from '@polkadot/types/interfaces';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  proposal: Proposal;
  founders: string[];
  onClose: () => void;
}

function Veto ({ className = '', founders, onClose, proposal }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);

  return <Modal
    className={className}
    header={t<string>('Propose veto')}
    size='large'
  >
    <Modal.Content>
      <Modal.Columns hint={t<string>('xxx')}>
        <InputAddress
          filter={founders}
          help={t<string>('xxx')}
          label={t<string>('veto with account')}
          onChange={setAccountId}
          type='account'
          withLabel
        />
      </Modal.Columns>
    </Modal.Content>
    <Modal.Actions onCancel={onClose}>
      <TxButton
        accountId={accountId}
        icon='plus'
        isDisabled={!accountId}
        label={t<string>('Submit veto')}
        onStart={onClose}
        params={[proposal.hash]}
        tx={api.tx.alliance.veto}
      />
    </Modal.Actions>
  </Modal>;
}

export default React.memo(Veto);
