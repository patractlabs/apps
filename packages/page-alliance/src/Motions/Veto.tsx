// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Proposal, ProposalIndex } from '@polkadot/types/interfaces';

import React, { useState } from 'react';

import { InputAddress, Modal, ProposedAction, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  proposal: Proposal;
  founders: string[];
  idNumber: ProposalIndex;
  onClose: () => void;
}

function Veto ({ className = '', founders, idNumber, onClose, proposal }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);

  return <Modal
    className={className}
    header={t<string>('veto the proposal')}
    size='large'
  >
    <Modal.Content>
      <Modal.Columns hint={t<string>('The proposal that will be vetoed. Once vetoed for the current voting round, it would need to be re-submitted to the alliance for a subsequent voting round.')}>
        <ProposedAction
          idNumber={idNumber}
          proposal={proposal}
        />
      </Modal.Columns>
      <Modal.Columns hint={t<string>('The alliance founder account that will veto the proposal for the current round.')}>
        <InputAddress
          filter={founders}
          help={t<string>('Select the account you wish to veto the proposal with.')}
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
        label={t<string>('Veto')}
        onStart={onClose}
        params={[proposal.hash]}
        tx={api.tx.alliance.veto}
      />
    </Modal.Actions>
  </Modal>;
}

export default React.memo(Veto);
