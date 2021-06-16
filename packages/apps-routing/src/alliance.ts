// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component, { useCounter } from '@polkadot/app-alliance';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'governance',
    icon: 'atom',
    name: 'alliance',
    text: t('nav.alliance', 'Alliance', {
      ns: 'apps-routing'
    }),
    useCounter
  };
}
