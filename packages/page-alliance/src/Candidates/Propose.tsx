// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Button, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  candidate: string;
  isMember: boolean;
  members: string[];
}

function Propose ({ candidate, isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);

  const approval = useMemo(() => api.tx.alliance.approveCandidate(candidate), [api.tx.alliance, candidate]);
  const rejection = useMemo(() => api.tx.alliance.rejectCandidate(candidate), [api.tx.alliance, candidate]);

  return <>
    <Button
      icon='paper-plane'
      isDisabled={!isMember}
      label={t<string>('Propose')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Propose candidacy')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The vote will be recorded for the selected account.')}>
            <InputAddress
              filter={members}
              help={t<string>('This account will be use to propose candidacy.')}
              label={t<string>('propose account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              defaultValue={candidate}
              help={t<string>('xxx')}
              isDisabled
              label={t<string>('Candidate')}
              type='account'
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Approve')}
            onStart={toggleVisible}
            params={[approval]}
            tx={api.tx.alliance.propose}
          />
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Rejection')}
            onStart={toggleVisible}
            params={[rejection]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Propose);
