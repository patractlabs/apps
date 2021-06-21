// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash, Proposal, ProposalIndex } from '@polkadot/types/interfaces';

import React, { useState } from 'react';

import { Button, Modal, ProposedAction, TxButton, VoteAccount } from '@polkadot/react-components';
import { useAccounts, useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  hash: Hash;
  idNumber: ProposalIndex;
  isDisabled: boolean;
  members: string[];
  proposal: Proposal;
}

function Voting ({ hash, idNumber, isDisabled, members, proposal }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { hasAccounts } = useAccounts();
  const [isVotingOpen, toggleVoting] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);

  if (!hasAccounts) {
    return null;
  }

  return (
    <>
      {isVotingOpen && (
        <Modal
          header={t<string>('vote on proposal')}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns hint={t<string>('The proposal that is being voted on. It will pass when the threshold is reached.')}>
              <ProposedAction
                idNumber={idNumber}
                proposal={proposal}
              />
            </Modal.Columns>
            <Modal.Columns hint={t<string>('The alliance founder or fellow accounts for this vote. The selection is filtered by the current accounts with proposing rights.')}>
              <VoteAccount
                filter={members}
                onChange={setAccountId}
              />
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions onCancel={toggleVoting}>
            <TxButton
              accountId={accountId}
              icon='ban'
              isDisabled={isDisabled}
              label={t<string>('Vote Nay')}
              onStart={toggleVoting}
              params={[hash, idNumber, false]}
              tx={api.tx.alliance.vote}
            />
            <TxButton
              accountId={accountId}
              icon='check'
              isDisabled={isDisabled}
              label={t<string>('Vote Aye')}
              onStart={toggleVoting}
              params={[hash, idNumber, true]}
              tx={api.tx.alliance.vote}
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='check'
        isDisabled={isDisabled}
        label={t<string>('Vote')}
        onClick={toggleVoting}
      />
    </>
  );
}

export default React.memo(Voting);
