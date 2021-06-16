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

  return <Modal
    className={className}
    header={t<string>('Propose elevate to fellow')}
    size='large'
  >
    <Modal.Content>
      <Modal.Columns hint={t<string>('This account will make the proposal and be responsible for the bond.')}>
        <InputAddress
          filter={members}
          help={t<string>('Select the account you wish to submit the proposal from.')}
          label={t<string>('submit with account')}
          onChange={setAccountId}
          type='account'
          withLabel
        />
      </Modal.Columns>
      <Modal.Columns hint={t<string>('The account will elevate to fellow.')}>
        <InputAddress
          defaultValue={address}
          help={t<string>('xxx')}
          isDisabled
          label={t<string>('xxx')}
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

export default React.memo(Elevate);
