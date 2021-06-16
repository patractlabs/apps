// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';

import { AddressSmall, Button, Menu, Popup } from '@polkadot/react-components';
import { useAccounts, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import { useWebsite } from '../useWebsite';
import Kick from './Kick';

interface Props {
  className?: string;
  fellow: string;
  isFavorite: boolean;
  isMember: boolean;
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Fellow ({ className, fellow, isMember, onRetire }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const website = useWebsite(fellow);
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isKickOpen, toggleKick] = useToggle();
  const { allAccounts } = useAccounts();

  const _onRetire = useCallback(() => onRetire(fellow), [fellow, onRetire]);

  const menuItems = useMemo(() => {
    const items = [];

    if (allAccounts.includes(fellow)) {
      items.push(<Menu.Item
        key='retire'
        onClick={_onRetire}
      >
        {t('Retire')}
      </Menu.Item>);
    }

    if (isMember) {
      items.push(<Menu.Item
        key='kicking out'
        onClick={toggleKick}
      >
        {t('Propose kicking out')}
      </Menu.Item>);
    }

    return items;
  }, [_onRetire, allAccounts, fellow, isMember, t, toggleKick]);

  return <>
    <tr className={className}>
      <td className='address'><AddressSmall value={fellow} /></td>
      <td className='start'>
        <a
          href={website}
          rel='noopener noreferrer'
          target='_blank'
        >
          {website}
        </a>
      </td>
      <td className='button'>
        <Popup
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          trigger={
            <Button
              icon='ellipsis-v'
              isDisabled={!menuItems.length}
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
      </td>
    </tr>
    {isKickOpen && <Kick
      address={fellow}
      onClose={toggleKick}
    />}
  </>;
}

export default React.memo(Fellow);
