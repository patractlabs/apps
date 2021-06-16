// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';

import { Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import { useCidDecode } from '../useCid';

interface Props {
  className?: string
  isMember: boolean;
  members: string[];
  onClose: () => void;
}

function Rule ({ members, onClose }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
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

  return (
    <Modal
      header={t<string>('Set rule')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns hint={t<string>('The vote will be recorded for the selected account.')}>
          <InputAddress
            filter={members}
            help={t<string>('This account will be use to propose set rule.')}
            label={t<string>('propose account')}
            onChange={setAccountId}
            type='account'
          />
        </Modal.Columns>
        <Modal.Columns hint={t<string>('Ipfs Hash')}>
          <Input
            help={t<string>('Ipfs hash')}
            isError={!ruleEncode}
            label={t<string>('Ipfs hash')}
            onChange={setRule}
          />
        </Modal.Columns>
      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          isDisabled={!accountId || !ruleEncode}
          label={t<string>('Set rule')}
          onStart={onClose}
          params={[propose]}
          tx={api.tx.alliance.propose}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(Rule);
