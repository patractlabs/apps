// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Button, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import { useCidDecode } from '../useCid';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
}

function Propose ({ className = '', isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const { api } = useApi();

  const hashEncode = useCidDecode(hash);

  const propose = useMemo(() => {
    if (!hashEncode || !accountId) {
      return null;
    }

    return api.tx.alliance.announce(hashEncode);
  }, [accountId, api.tx.alliance, hashEncode]);

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={!isMember}
      label={t<string>('Propose Announcement')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Propose an alliance motion')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The vote will be recorded for the selected account.')}>
            <InputAddress
              filter={members}
              help={t<string>('This account will be use to propose announce.')}
              label={t<string>('propose account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('Ipfs Hash')}>
            <Input
              help={t<string>('Ipfs hash')}
              label={t<string>('Ipfs hash')}
              onChange={setHash}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId || !hashEncode}
            label={t<string>('Propose')}
            onStart={toggleVisible}
            params={[propose]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Propose);
