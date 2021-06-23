// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import Expander from './Expander';

export interface Props {
  content: string;
  className?: string;
}

function ExpanderMarkdown ({ className = '', content }: Props): React.ReactElement<Props> {
  return (
    <Expander
      className={className}
      summary={content.split('\n')[0]}
    >
      <Markdown className='ui--ExpanderMarkdown-content'>{content}</Markdown>
    </Expander>
  );
}

export default React.memo(styled(ExpanderMarkdown)`
  .ui--ExpanderMarkdown-content {
    text-align: left;
  }
`);
