// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';

import React, { useMemo } from 'react';

import ProposalCell from '@polkadot/app-democracy/Overview/ProposalCell';
import { Button, Icon, Menu, Popup, TxButton } from '@polkadot/react-components';
import { useAccounts, useApi, useToggle, useVotingStatus, useWeight } from '@polkadot/react-hooks';
import { BlockToTime } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import Close from './Close';
import Veto from './Veto';
import Voters from './Voters';
import Voting from './Voting';

interface Props {
  className?: string;
  isMember: boolean;
  isFounder: boolean;
  founders: string[];
  members: string[];
  motion: DeriveCollectiveProposal;
}

interface VoterState {
  hasVoted: boolean;
  hasVotedAye: boolean;
}

function Motion ({ className = '', founders, isFounder, isMember, members, motion: { hash, proposal, votes } }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const [isMenuOpen, toggleMenu] = useToggle();
  const [isVetoOpen, toggleVeto] = useToggle();
  const { isCloseable, isVoteable, remainingBlocks } = useVotingStatus(votes, members.length, 'alliance');
  const [proposalWeight, proposalLength] = useWeight(proposal);

  const menuItems = useMemo(() => {
    const items = [];

    if (isFounder &&
      proposal.section.toLowerCase() === 'alliance' &&
      (proposal.method.toLowerCase() === 'elevateally' || proposal.method.toLowerCase() === 'setrule')
    ) {
      items.push(<Menu.Item
        key='veto'
        onClick={toggleVeto}
      >
        {t('Veto')}
      </Menu.Item>);
    }

    return items;
  }, [isFounder, t, toggleVeto, proposal]);

  const [memberId, isMultiMembers] = useMemo(
    (): [string | null, boolean] => {
      const memberIds = allAccounts.filter((accountId) => members.includes(accountId));

      return [memberIds[0] || null, memberIds.length > 1];
    },
    [allAccounts, members]
  );

  const { hasVoted, hasVotedAye } = useMemo(
    (): VoterState => {
      if (votes) {
        const hasVotedAye = allAccounts.some((address) => votes.ayes.some((accountId) => accountId.eq(address)));

        return {
          hasVoted: hasVotedAye || allAccounts.some((address) => votes.nays.some((accountId) => accountId.eq(address))),
          hasVotedAye
        };
      }

      return { hasVoted: false, hasVotedAye: false };
    },
    [allAccounts, votes]
  );

  if (!votes) {
    return null;
  }

  const { ayes, end, index, nays, threshold } = votes;

  return (
    <tr className={className}>
      <td className='number'><h1>{formatNumber(index)}</h1></td>
      <ProposalCell
        imageHash={hash}
        proposal={proposal}
      />
      <td className='number together'>
        {formatNumber(threshold)}
      </td>
      <td className='number together'>
        {remainingBlocks && end && (
          <>
            <BlockToTime value={remainingBlocks} />
            #{formatNumber(end)}
          </>
        )}
      </td>
      <td className='expand'>
        <Voters
          isAye
          members={members}
          threshold={threshold}
          votes={ayes}
        />
        <Voters
          members={members}
          threshold={threshold}
          votes={nays}
        />
      </td>
      <td className='button'>
        {isVoteable && !isCloseable && (
          <Voting
            hash={hash}
            idNumber={index}
            isDisabled={!isMember}
            members={members}
            proposal={proposal}
          />
        )}
        {isCloseable && (
          isMultiMembers
            ? (
              <Close
                hash={hash}
                idNumber={index}
                members={members}
                proposal={proposal}
              />
            )
            : (
              <TxButton
                accountId={memberId}
                icon='times'
                label={t<string>('Close')}
                params={[hash, index, proposalWeight, proposalLength]}
                tx={api.tx.alliance.close}
              />
            )
        )}
      </td>
      <td className='badge'>
        {isMember && (
          <Icon
            color={hasVoted ? (hasVotedAye ? 'green' : 'red') : 'gray'}
            icon='asterisk'
          />
        )}
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
      {
        isVetoOpen &&
          <Veto
            founders={founders}
            idNumber={index}
            onClose={toggleVeto}
            proposal={proposal}
          />
      }
    </tr>
  );
}

export default React.memo(Motion);
