// Copyright 2017-2021 @polkadot/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';
import type { Props } from '../types';

import React from 'react';

import { useCidEncode } from '@polkadot/app-alliance/useCid';
import { Input } from '@polkadot/react-components';

import Bare from './Bare';

function CidComp ({ className = '', defaultValue: { isValid, value }, isDisabled, isError, isInOption, label, onChange, onEnter, onEscape, registry, type, withLabel }: Props): React.ReactElement<Props> {
  const cidStr = useCidEncode(value as Cid);

  return (
    <Bare className={className}>
      <Input
        className='full'
        defaultValue={cidStr}
        isDisabled={isDisabled}
        isError={isError || !isValid}
        label={label}
        onEnter={onEnter}
        onEscape={onEscape}
        placeholder='cid hash'
        type='text'
        withLabel={withLabel}
      />
    </Bare>
  );
}

export default React.memo(CidComp);
