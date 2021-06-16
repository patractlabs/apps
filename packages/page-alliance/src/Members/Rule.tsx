// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Button, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import { useCidDecode } from '../useCid';

interface Props {
  className?: string
  isMember: boolean;
}

function Rule ({ className = '', isMember }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [rule, setRule] = useState<string | null>(null);
  const { api } = useApi();

  const ruleEncode = useCidDecode(rule);

  const propose = useMemo(() => {
    if (!ruleEncode || !accountId) {
      return null;
    }

    return api.tx.alliance.setRule(ruleEncode);
  }, [accountId, api.tx.alliance, ruleEncode]);

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={!isMember}
      label={t<string>('Set Rule')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Set rule')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The vote will be recorded for the selected account.')}>
            <InputAddress
              help={t<string>('This account will be use to propose set rule.')}
              label={t<string>('propose account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          <Modal.Columns hint={t<string>('Ipfs Hash')}>
            <Input
              help={t<string>('Ipfs hash')}
              label={t<string>('Ipfs hash')}
              onChange={setRule}
            />
          </Modal.Columns>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId || !rule}
            label={t<string>('Set rule')}
            onStart={toggleVisible}
            params={[propose]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Rule);
