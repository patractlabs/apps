// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';

import { AddressSmall, Button, Menu, Popup } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import { useWebsite } from '../useWebsite';
import Kick from './Kick';

interface Props {
  className?: string;
  ally: string;
  isFavorite: boolean;
  isMember: boolean;
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Ally ({ ally, className, isMember, onRetire }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const website = useWebsite(ally);
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isKickOpen, toggleKick] = useToggle();

  const _onRetire = useCallback(() => onRetire(ally), [ally, onRetire]);

  const menuItems = useMemo(() => {
    const items = [<Menu.Item
      key='retire'
      onClick={_onRetire}
    >
      {t('Retire')}
    </Menu.Item>];

    if (isMember) {
      items.push(<Menu.Item
        key='kicking out'
        onClick={toggleKick}
      >
        {t('Propose kicking out')}
      </Menu.Item>);
    }

    return items;
  }, [_onRetire, isMember, t, toggleKick]);

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
      address={ally}
      onClose={toggleKick}
    />}
  </>;
}

export default React.memo(Ally);
