// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';

import { AddressSmall, Menu, Popup } from '@polkadot/react-components';
import { useAccounts, useToggle } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate';
import { useDeposit } from '../useDeposit';
import { useWebsite } from '../useWebsite';
import Kick from './Kick';

interface Props {
  className?: string;
  founder: string;
  isFavorite: boolean;
  isMember: boolean;
  members: string[];
  onRetire: (address: string) => void;
  toggleFavorite: (address: string) => void;
}

function Founder ({ className, founder, isMember, members, onRetire }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const website = useWebsite(founder);
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isKickOpen, toggleKick] = useToggle();
  const { allAccounts } = useAccounts();
  const deposite = useDeposit(founder);

  const _onRetire = useCallback(() => onRetire(founder), [founder, onRetire]);

  const menuItems = useMemo(() => {
    const items = [];

    if (allAccounts.includes(founder)) {
      items.push(
        <Menu.Item
          key='retire'
          onClick={_onRetire}
        >
          {t('Retire')}
        </Menu.Item>
      );
    }

    if (isMember) {
      items.push(
        <Menu.Item
          key='kicking out'
          onClick={toggleKick}
        >
          {t('Propose kicking out')}
        </Menu.Item>
      );
    }

    return items;
  }, [_onRetire, allAccounts, founder, isMember, t, toggleKick]);

  return <>
    <tr className={className}>
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
              value={
                <Menu>
                  {menuItems}
                </Menu>
              }
            />
        }
      </td>
    </tr>
    {isKickOpen &&
    <Kick
      address={founder}
      members={members}
      onClose={toggleKick}
    />}
  </>;
}

export default React.memo(Founder);
