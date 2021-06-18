// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { Button, Menu, Popup, Table } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import Rule from './Rule';

interface Props {
  className?: string;
  rule: string | null;
  isMember: boolean;
  members: string[];
}

function Rules ({ className, isMember, members, rule }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isSetRuleOpen, toggleSetRule] = useToggle();

  const header = useMemo(() => [
    [t<string>('Alliance rule')],
    []
  ], [t]);

  const menuItems = useMemo(() => {
    const items = [];

    if (isMember) {
      items.push(<Menu.Item
        key='set-rule'
        onClick={toggleSetRule}
      >
        {t('Propose setting rule')}
      </Menu.Item>);
    }

    return items;
  }, [isMember, t, toggleSetRule]);

  return (
    <Table
      className={className}
      empty={t<string>('No rule')}
      header={header}
    >
      <tr>
        <td className='start'>
          <a
            href={rule ? `https://ipfs.io/ipfs/${rule}` : ''}
            rel='noopener noreferrer'
            target='_blank'
          >
            {rule}
          </a>
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
      {
        isSetRuleOpen &&
          <Rule
            isMember={isMember}
            members={members}
            onClose={toggleSetRule} />
      }
    </Table>
  );
}

export default React.memo(Rules);
