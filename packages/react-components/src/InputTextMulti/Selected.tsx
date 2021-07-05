// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';

interface Props {
  text: string;
  filter?: string;
  isHidden?: boolean;
  onDeselect: (text: string) => void;
}

function Selected ({ filter, isHidden, onDeselect, text }: Props): React.ReactElement<Props> | null {
  const _onDeselect = useCallback(
    (): void => onDeselect(text),
    [text, onDeselect]
  );

  if (filter && !text.includes(filter)) {
    return null;
  }

  if (isHidden) {
    return null;
  }

  return <div
    onClick={_onDeselect}
  >
    {text}
  </div>;
}

export default React.memo(Selected);
