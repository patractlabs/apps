// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Button, Dropdown, InputAddress, Modal, TxButton } from '@polkadot/react-components';
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
  const [allianceType, setAllianceType] = useState('accept');

  const allianceTypeOpt = useMemo(() => [
    { text: t<string>('Acceptance proposal'), value: 'accept' },
    { text: t<string>('Rejection proposal'), value: 'reject' }
  ], [t]);

  const proposal = useMemo(() => {
    return allianceType === 'reject'
      ? api.tx.alliance.rejectCandidate(candidate)
      : api.tx.alliance.approveCandidate(candidate);
  }, [allianceType, api.tx.alliance, candidate]);

  return <>
    <Button
      icon='step-forward'
      isDisabled={!isMember}
      label={t<string>('Propose')}
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
              help={t<string>('This account will be use to propose candidacy.')}
              label={t<string>('propose account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('xxx')}>
            <Dropdown
              help={t<string>('The type of alliance proposal to submit.')}
              label={t<string>('alliance proposal type')}
              onChange={setAllianceType}
              options={allianceTypeOpt}
              value={allianceType}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId}
            label={t<string>('Propose')}
            onStart={toggleVisible}
            params={[proposal]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Propose);
