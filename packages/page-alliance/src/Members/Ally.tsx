// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';

import { AddressSmall, Button, Menu, Popup } from '@polkadot/react-components';
import { useAccounts, useToggle } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate';
import { useDeposit } from '../useDeposit';
import { useWebsite } from '../useWebsite';
import Elevate from './Elevate';
import Kick from './Kick';

interface Props {
  className?: string;
  ally: string;
  isFavorite: boolean;
  isMember: boolean;
  members: string[];
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Ally ({ ally, className, isMember, members, onRetire }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const website = useWebsite(ally);
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isKickOpen, toggleKick] = useToggle();
  const [isElevateOpen, toggleElevate] = useToggle();
  const { allAccounts } = useAccounts();
  const deposite = useDeposit(ally);

  const _onRetire = useCallback(() => onRetire(ally), [ally, onRetire]);

  const menuItems = useMemo(() => {
    const items = [];

    if (allAccounts.includes(ally)) {
      items.push(<Menu.Item
        key='retire'
        onClick={_onRetire}
      >
        {t('Retire')}
      </Menu.Item>);
    }

    if (isMember) {
      items.push(
        <Menu.Item
          key='kicking out'
          onClick={toggleKick}
        >
          {t('Propose kicking out')}
        </Menu.Item>,
        <Menu.Item
          key='elevate to fellow'
          onClick={toggleElevate}
        >
          {t('Propose elevating to fellow')}
        </Menu.Item>
      );
    }

    return items;
  }, [_onRetire, allAccounts, ally, isMember, t, toggleElevate, toggleKick]);

  return <>
    <tr className={className}>
      <td className='address'><AddressSmall value={ally} /></td>
      <td className='start'>
        <a
          href={website}
          rel='noopener noreferrer'
          target='_blank'
        >
          {website}
        </a>
      </td>
      <td className='start'>
        {
          deposite
            ? <FormatBalance value={deposite} />
            : '-'
        }
      </td>
      <td className='button'>
        {
          !!menuItems.length &&
            <Popup
              isOpen={isMenuOpen}
              onClose={toggleMenu}
              trigger={
                <Button
                  icon='ellipsis-v'
                  onClick={toggleMenu}
                />
              }
            >
              <Menu
                onClick={toggleMenu}
                text
                vertical
              >
                {menuItems}
              </Menu>
            </Popup>
        }
      </td>
    </tr>
    {isKickOpen && <Kick
      address={ally}
      key='kick'
      members={members}
      onClose={toggleKick}
    />}
    {isElevateOpen && <Elevate
      address={ally}
      key='elevate'
      members={members}
      onClose={toggleElevate}
    />}
  </>;
}

export default React.memo(Ally);
