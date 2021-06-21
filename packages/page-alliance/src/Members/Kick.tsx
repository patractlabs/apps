// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  address: string;
  members: string[];
  onClose: () => void;
}

function Kick ({ address, className, members, onClose }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);

  const proposal = useMemo(() => api.tx.alliance.kickMember(address), [address, api.tx.alliance]);

  return <Modal
    className={className}
    header={t<string>('propose kicking out a member')}
    size='large'
  >
    <Modal.Content>
      <Modal.Columns hint={t<string>('The alliance founder or fellow accounts for the proposal. The selection is filtered by the current accounts with proposing rights.')}>
        <InputAddress
          filter={members}
          help={t<string>('Select the account you wish to submit the proposal from.')}
          label={t<string>('Propose from account')}
          onChange={setAccountId}
          type='account'
          withLabel
        />
      </Modal.Columns>
      <Modal.Columns hint={t<string>('If the motion is passed, this account will be kicked out and if it has deposit, the deposit will be slashed. During the motion, the account can\'t retire.')}>
        <InputAddress
          defaultValue={address}
          help={t<string>('The account whom you wish to kick out')}
          isDisabled
          label={t<string>('kicking account')}
          type='allPlus'
        />
      </Modal.Columns>
    </Modal.Content>
    <Modal.Actions onCancel={onClose}>
      <TxButton
        accountId={accountId}
        icon='plus'
        isDisabled={!accountId}
        label={t<string>('Submit proposal')}
        onStart={onClose}
        params={[proposal]}
        tx={api.tx.alliance.propose}
      />
    </Modal.Actions>
  </Modal>;
}

export default React.memo(Kick);
