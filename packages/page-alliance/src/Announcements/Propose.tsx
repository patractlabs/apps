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
        header={t<string>('propose an announcement')}
        onClose={toggleVisible}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The alliance founder or fellow accounts for the proposal. The selection is filtered by the current accounts with proposing rights.')}>
            <InputAddress
              filter={members}
              help={t<string>('This account will be use to propose announce.')}
              label={t<string>('Propose from account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('The IPFS hash of the announcement, better be formatted in a single Markdown document.')}>
            <Input
              help={t<string>('IPFS hash')}
              isError={!hashEncode}
              label={t<string>('IPFS hash')}
              onChange={setHash}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions>
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
