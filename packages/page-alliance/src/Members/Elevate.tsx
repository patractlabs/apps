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

function Elevate ({ address, className, members, onClose }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);

  const proposal = useMemo(() => api.tx.alliance.elevateAlly(address), [address, api.tx.alliance]);

  return (
    <Modal
      className={className}
      header={t<string>('propose elevating an ally to fellow')}
      onClose={onClose}
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
        <Modal.Columns hint={t<string>('If the motion is passed, this account will be elevated from ally to fellow, then it will have proposing and voting rights.')}>
          <InputAddress
            defaultValue={address}
            help={t<string>('The account you wish to be elevated to fellow')}
            isDisabled
            label={t<string>('elevating account')}
            type='allPlus'
          />
        </Modal.Columns>
      </Modal.Content>
      <Modal.Actions>
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
    </Modal>);
}

export default React.memo(Elevate);
