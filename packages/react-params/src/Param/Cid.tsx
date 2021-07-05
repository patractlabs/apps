// Copyright 2017-2021 @polkadot/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';
import type { Props } from '../types';

import React from 'react';

import { useCidEncode } from '@polkadot/app-alliance/useCid';
import { Static } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Bare from './Bare';

function CidParam ({ className = '', defaultValue: { value }, isDisabled, isError, label, withLabel }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const cidStr = useCidEncode(value as Cid);

  return (
    <Bare className={className}>
      <Static
        className='full'
        isDisabled={isDisabled}
        isError={isError}
        label={label}
        value={cidStr || t<string>('<empty>')}
        withCopy
        withLabel={withLabel}
      />
    </Bare>
  );
}

export default React.memo(CidParam);
