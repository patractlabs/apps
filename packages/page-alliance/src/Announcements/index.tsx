// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import React, { useMemo } from 'react';

import { Button, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Announcement from './Announcement';
import Propose from './Propose';

interface Props {
  className?: string;
  announcements: Cid[];
  isMember: boolean;
  members: string[];
}

function Announcements ({ announcements: announcementsSource, isMember, members }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const announcements = useMemo(() => [...(announcementsSource || [])].reverse(), [announcementsSource]);

  const header = useMemo(() => [
    [t('Announcements'), 'start'],
    [t('IPFS Hash'), 'start']
  ], [t]);

  return <>
    <Button.Group>
      <Propose
        isMember={isMember}
        members={members}
      />
    </Button.Group>
    <Table
      empty={t<string>('No announcements')}
      header={header}
    >
      {announcements.map((announcement, index) => <Announcement
        announcement={announcement}
        index={index}
        key={index}
      />)}
    </Table>
  </>;
}

export default React.memo(Announcements);
