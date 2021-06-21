// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash, Proposal, ProposalIndex } from '@polkadot/types/interfaces';

import React, { useState } from 'react';

import { Button, InputAddress, Modal, ProposedAction, TxButton } from '@polkadot/react-components';
import { useApi, useToggle, useWeight } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  hash: Hash;
  idNumber: ProposalIndex;
  members: string[];
  proposal: Proposal;
}

function Close ({ hash, idNumber, members, proposal }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [proposalWeight, proposalLength] = useWeight(proposal);

  // protect against older versions
  if (!api.tx.alliance.close) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <Modal
          header={t<string>('close the proposal')}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns hint={t<string>('The proposal that will be affected. Once closed for the current voting round, it would need to be re-submitted to alliance for a subsequent voting round.')}>
              <ProposedAction
                idNumber={idNumber}
                proposal={proposal}
              />
            </Modal.Columns>
            <Modal.Columns hint={t<string>(' The alliance founder or fellow account that will apply the close for the current round.')}>
              <InputAddress
                filter={members}
                help={t<string>('Select the account you wish close the proposal with.')}
                label={t<string>('close with account')}
                onChange={setAccountId}
                type='account'
              />
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions onCancel={toggleOpen}>
            <TxButton
              accountId={accountId}
              onStart={toggleOpen}
              params={[hash, idNumber, proposalWeight, proposalLength]}
              tx={api.tx.alliance.close}
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='times'
        label={t<string>('Close')}
        onClick={toggleOpen}
      />
    </>
  );
}

export default React.memo(Close);
