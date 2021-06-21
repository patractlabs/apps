// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo, useState } from 'react';

import { Button, Columar, Dropdown, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { DropdownOptions } from '@polkadot/react-components/util/types';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

type BlackListType = 'Website' | 'AccountId';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
}

interface ItemProps {
  index: number;
  value: BlackListValue;
  onChange: (value: BlackListValue) => void;
}

interface BlackListValue {
  value: string;
  type: BlackListType;
  valid: boolean;
}

function AddItem ({ index, onChange, value }: ItemProps): React.ReactElement<ItemProps> {
  const { t } = useTranslation();

  const options: DropdownOptions = useMemo(() => [{
    key: 'Website',
    text: 'Website',
    value: 'Website'
  }, {
    key: 'AccountId',
    text: 'AccountId',
    value: 'AccountId'
  }], []);

  const onValueChange = useCallback((newValue: string | null) => {
    const valid = value.type === 'Website'
      ? !!(['https://', 'http://'].find((prefix) => newValue?.startsWith(prefix)))
      : true;

    onChange({
      type: value.type,
      valid,
      value: newValue || ''
    });
  }, [onChange, value.type]);

  const onTypeChange = useCallback((type: BlackListType) => {
    if (type !== value.type) {
      onChange({
        type,
        valid: false,
        value: ''
      });
    }
  }, [onChange, value.type]);

  return <Columar>
    <Columar.Column>
      <Dropdown
        className={'ui--DropdownLinked-Sections'}
        label={t<string>('Select type')}
        onChange={onTypeChange}
        options={options}
        value={value.type}
        withLabel
      />
    </Columar.Column>
    <Columar.Column>
      {
        value.type === 'Website'
          ? <Input
            defaultValue={value.value}
            isError={!value.valid}
            label={t<string>('website {{index}}', { replace: { index: index + 1 } })}
            maxLength={32}
            onChange={onValueChange}
            placeholder={t('https://example.com')}
          />
          : <InputAddress
            defaultValue={value.value}
            isError={!value.value}
            label={t<string>('address {{index}}', { replace: { index: index + 1 } })}
            onChange={onValueChange}
          />
      }
    </Columar.Column>
  </Columar>;
}

const InitialValue: BlackListValue = { type: 'Website', valid: false, value: '' };

function Add ({ className, isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [blacklists, setBlacklists] = useState<BlackListValue[]>([InitialValue]);

  const _rowAdd = useCallback(
    () => setBlacklists((_blacklists) => _blacklists.concat([InitialValue])),
    []
  );

  const _rowRemove = useCallback(
    () => setBlacklists((_blacklists) => _blacklists && _blacklists.slice(0, _blacklists.length - 1)),
    []
  );

  const propose = useMemo(() => api.tx.alliance.addBlacklist(blacklists.map((blacklist) => {
    if (blacklist.type === 'Website') {
      return {
        Website: api.registry.createType('Bytes', blacklist.value)
      };
    } else {
      return {
        AccountId: blacklist.value
      };
    }
  })), [api.registry, api.tx.alliance, blacklists]);

  const isValid = useMemo(
    () => blacklists.every((item) => item.valid) &&
      (new Set(blacklists.map((item) => item.value))).size === blacklists.length,
    [blacklists]
  );

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={!isMember}
      label={t<string>('Propose adding')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('propose adding blacklist items')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('The alliance founder or fellow accounts for the proposal. The selection is filtered by the current accounts with proposing rights.')}>
            <InputAddress
              filter={members}
              help={t<string>('Select the account you wish to submit the proposal from.')}
              label={t<string>('propose from account')}
              onChange={setAccountId}
              type='account'
            />
          </Modal.Columns>
          {!blacklists.length
            ? <article>{t('No blacklist.')}</article>
            : blacklists.map((blacklist, index) =>
              <AddItem
                index={index}
                key={index}
                onChange={(value) => setBlacklists((_blacklists) => _blacklists.map((_blacklist, i) => i === index ? value : _blacklist))}
                value={blacklist}
              />
            )
          }
          <Button.Group>
            <Button
              icon='plus'
              label={t<string>('Add item')}
              onClick={_rowAdd}
            />
            <Button
              icon='minus'
              isDisabled={blacklists.length === 0}
              label={t<string>('Remove item')}
              onClick={_rowRemove}
            />
          </Button.Group>
        </Modal.Content>
        <Modal.Actions onCancel={toggleVisible}>
          <TxButton
            accountId={accountId}
            isDisabled={!accountId || !isValid}
            label={t<string>('Submit proposal')}
            onStart={toggleVisible}
            params={[propose]}
            tx={api.tx.alliance.propose}
          />
        </Modal.Actions>
      </Modal>
    )}
  </>;
}

export default React.memo(Add);
