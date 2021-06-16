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
}

function Announcements ({ announcements }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('Announcements'), 'start']
  ], [t]);

  return <>
    <Button.Group>
      <Propose />
    </Button.Group>
    <Table
      empty={t<string>('No announcements')}
      header={header}
    >
      {announcements.map((announcement) => <Announcement
        announcement={announcement}
        key={announcement.toHex()}
      />)}
    </Table>
  </>;
}

export default React.memo(Announcements);
