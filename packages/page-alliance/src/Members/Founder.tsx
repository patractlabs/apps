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
  founder: string;
  isFavorite: boolean;
  isMember: boolean;
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Founder ({ className, founder, isMember, onRetire }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const website = useWebsite(founder);
  const [isMenuOpen, toggleMenu] = useToggle();

  // const _onFavorite = useCallback(() => toggleFavorite(founder), [founder, toggleFavorite]);
  const _onRetire = useCallback(() => onRetire(founder), [founder, onRetire]);

  const menuItems = useMemo(() => {
    const items = [<Menu.Item
      key='retire'
      onClick={_onRetire}
    >
      {t('Retire')}
    </Menu.Item>];

    if (isMember) {
      items.push(<Kick
        address={founder}
        key='kicking out'
      />);
    }

    return items;
  }, [_onRetire, founder, isMember, t]);

  return <tr className={className}>
    <td className='address'><AddressSmall value={founder} /></td>
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
  </tr>;
}

export default React.memo(Founder);
