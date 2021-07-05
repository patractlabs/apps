// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';
import type { Option, Vec } from '@polkadot/types';
import type { AccountId, Cid, Url } from '@polkadot/types/interfaces';

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@polkadot/react-components';
import { useApi, useCall, useFavorites } from '@polkadot/react-hooks';

import Announcements from './Announcements';
import Blacklist from './Blacklist';
import Candidates from './Candidates';
import { STORE_FAVS_BASE } from './constants';
import Members from './Members';
import Motions from './Motions';
import { useTranslation } from './translate';
import { useCidEncode } from './useCid';
import useCounter from './useCounter';
import { useMembers } from './useMembers';

export { useCounter };

interface Props {
  basePath: string;
  className?: string;
}

function AllianceApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { allies, count: memberCount, fellows, founders, isMember } = useMembers();
  const motions = useCall<DeriveCollectiveProposal[]>(api.derive.alliance.proposals);
  const counter = useCounter();
  const accountBlacklist = useCall<Vec<AccountId>>(api.query.alliance.accountBlacklist);
  const websiteBlacklist = useCall<Vec<Url>>(api.query.alliance.websiteBlacklist);
  const rule = useCall<Option<Cid>>(api.query.alliance.rule);
  const ruleEncode = useCidEncode(rule?.unwrapOrDefault());
  const candidates = useCall<Vec<AccountId>>(api.query.alliance.candidates);
  const announcements = useCall<Vec<Cid>>(api.query.alliance.announcements);
  const members = useMemo((): string[] => {
    return founders.concat(fellows);
  }, [fellows, founders]);
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS_BASE);

  const items = useMemo(() => [{
    isRoot: true,
    name: 'members',
    text: t('Members ({{count}})', {
      replace: {
        count: memberCount
      }
    })
  }, {
    count: counter,
    name: 'motions',
    text: t('Motions')
  }, {
    name: 'announcements',
    text: t('Announcements ({{count}})', {
      replace: {
        count: announcements?.length || 0
      }
    })
  }, {
    name: 'candidates',
    text: t('Candidates ({{count}})', {
      replace: {
        count: candidates?.length || 0
      }
    })
  }, {
    name: 'blacklist',
    text: t('Blacklist ({{count}})', {
      replace: {
        count: (websiteBlacklist?.length || 0) + (accountBlacklist?.length || 0)
      }
    })
  }], [accountBlacklist?.length, announcements?.length, candidates?.length, counter, memberCount, t, websiteBlacklist?.length]);

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={items}
      />
      <Switch>
        <Route path={`${basePath}/blacklist`}>
          <Blacklist
            accountBlacklist={accountBlacklist?.map((account) => account.toString()) || []}
            isMember={isMember}
            members={members}
            websiteBlacklist={websiteBlacklist?.map((website) => website.toHuman() as string) || []}
          />
        </Route>
        <Route path={`${basePath}/candidates`}>
          <Candidates
            candidates={candidates?.map((candidate) => candidate.toString()) || []}
            favorites={favorites}
            isMember={isMember}
            members={members}
            toggleFavorite={toggleFavorite}
          />
        </Route>
        <Route path={`${basePath}/announcements`}>
          <Announcements
            announcements={announcements?.map((announcement) => announcement) || []}
            isMember={isMember}
            members={members}
          />
        </Route>
        <Route path={`${basePath}/motions`}>
          <Motions
            isMember={isMember}
            members={members}
            motions={motions}
          />
        </Route>
        <Route>
          <Members
            allies={allies}
            favorites={favorites}
            fellows={fellows}
            founders={founders}
            isMember={isMember}
            members={members}
            rule={ruleEncode}
            toggleFavorite={toggleFavorite}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AllianceApp);
