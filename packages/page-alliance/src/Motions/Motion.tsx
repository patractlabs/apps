// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';

import React, { useMemo } from 'react';

import ProposalCell from '@polkadot/app-democracy/Overview/ProposalCell';
import { TxButton } from '@polkadot/react-components';
import { useAccounts, useApi, useVotingStatus, useWeight } from '@polkadot/react-hooks';
import { BlockToTime } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import Close from './Close';
import Voters from './Voters';
import Voting from './Voting';

interface Props {
  className?: string;
  isMember: boolean;
  members: string[];
  motion: DeriveCollectiveProposal;
}

function Motion ({ className = '', isMember, members, motion: { hash, proposal, votes } }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const { isCloseable, isVoteable, remainingBlocks } = useVotingStatus(votes, members.length, 'alliance');
  const [proposalWeight, proposalLength] = useWeight(proposal);

  const [memberId, isMultiMembers] = useMemo(
    (): [string | null, boolean] => {
      const memberIds = allAccounts.filter((accountId) => members.includes(accountId));

      return [memberIds[0] || null, memberIds.length > 1];
    },
    [allAccounts, members]
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
    </tr>
  );
}

export default React.memo(Motion);
