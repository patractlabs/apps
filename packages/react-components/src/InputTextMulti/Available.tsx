// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';

interface Props {
  text: string;
  filter: string;
  isHidden?: boolean;
  onSelect: (text: string) => void;
}

function Available ({ filter, isHidden, onSelect, text }: Props): React.ReactElement<Props> | null {
  const _onSelect = useCallback(
    () => onSelect(text),
    [text, onSelect]
  );

  if (filter && !text.includes(filter)) {
    return null;
  }

  if (isHidden) {
    return null;
  }

  return <div
    onClick={_onSelect}
  >
    {text}
  </div>;
}

export default React.memo(Available);
