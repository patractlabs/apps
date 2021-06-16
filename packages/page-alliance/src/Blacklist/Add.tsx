// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo, useState } from 'react';

import { Button, Columar, Dropdown, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { DropdownOptions } from '@polkadot/react-components/util/types';
import { useApi, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
}

interface ItemProps {
  index: number;
  value: Record<string, string | null>
  onChange: (value: Record<string, string | null>) => void;
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

  const _type = useMemo(() => {
    return Object.keys(value)[0];
  }, [value]);
  const _value = useMemo(() => {
    return value[_type];
  }, [_type, value]);

  const _valueChange = useCallback((value: string | null) => {
    onChange({ [_type]: value });
  }, [_type, onChange]);

  const _typeChange = useCallback((type: 'AccountId' | 'Website') => {
    onChange({ [type]: null });
  }, [onChange]);

  return <Columar>
    <Columar.Column>
      {_type === 'Website'
        ? <Input
          defaultValue={_value}
          label={t<string>('website {{index}}', { replace: { index: index + 1 } })}
          onChange={_valueChange}
        />
        : <InputAddress
          defaultValue={_value}
          label={t<string>('address {{index}}', { replace: { index: index + 1 } })}
          onChange={_valueChange}
        />}
    </Columar.Column>
    <Columar.Column>
      <Dropdown
        className={'ui--DropdownLinked-Sections'}
        label={t<string>('Select type')}
        onChange={_typeChange}
        options={options}
        value={_type}
        withLabel
      />
    </Columar.Column>
  </Columar>;
}

function Add ({ className, isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [blacklists, setBlacklists] = useState<Record<string, string | null>[]>([{ Website: null }]);

  const _rowAdd = useCallback(
    () => setBlacklists((_blacklists) => _blacklists.concat([{ Website: null }])),
    []
  );

  const _rowRemove = useCallback(
    () => setBlacklists((_blacklists) => _blacklists && _blacklists.slice(0, _blacklists.length - 1)),
    []
  );

  const propose = useMemo(() => api.tx.alliance.addBlacklist(blacklists.map((blacklist) => {
    if (Object.keys(blacklist)[0] === 'Website') {
      return {
        Website: api.registry.createType('Bytes', blacklist.Website)
      };
    } else {
      return {
        AccountId: blacklist.AccountId
      };
    }
  })), [api.registry, api.tx.alliance, blacklists]);

  return <>
    <Button
      className={className}
      icon='plus'
      isDisabled={!isMember}
      label={t<string>('Add blacklist')}
      onClick={toggleVisible}
    />
    {isVisible && (
      <Modal
        header={t<string>('Propose an alliance motion')}
        size='large'
      >
        <Modal.Content>
          <Modal.Columns hint={t<string>('xxx')}>
            <InputAddress
              filter={members}
              help={t<string>('xxx')}
              label={t<string>('xxx')}
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
            isDisabled={!accountId}
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

export default React.memo(Add);
