// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDebounce, useLoadingDelay } from '@polkadot/react-hooks';

import Input from '../Input';
import Spinner from '../Spinner';
import { useTranslation } from '../translate';
import Available from './Available';
import Selected from './Selected';

interface Props {
  available: string[];
  availableLabel: React.ReactNode;
  className?: string;
  defaultValue?: string[];
  help: React.ReactNode;
  maxCount: number;
  onChange: (values: string[]) => void;
  valueLabel: React.ReactNode;
}

function InputTextMulti ({ available, availableLabel, className = '', defaultValue, maxCount, onChange, valueLabel }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [_filter, setFilter] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  const filter = useDebounce(_filter);
  const isLoading = useLoadingDelay();

  useEffect((): void => {
    defaultValue && setSelected(defaultValue);
  }, [defaultValue]);

  useEffect((): void => {
    selected && onChange(selected);
  }, [onChange, selected]);

  const _onSelect = useCallback(
    (text: string): void =>
      setSelected(
        (selected: string[]) =>
          !selected.includes(text) && (selected.length < maxCount)
            ? selected.concat(text)
            : selected
      ),
    [maxCount]
  );

  const _onDeselect = useCallback(
    (text: string): void =>
      setSelected(
        (selected: string[]) =>
          selected.includes(text)
            ? selected.filter((a) => a !== text)
            : selected
      ),
    []
  );

  return (
    <div className={`ui--InputTextMulti ${className}`}>
      <Input
        autoFocus
        className='ui--InputTextMulti-Input'
        isSmall
        onChange={setFilter}
        placeholder={t<string>('filter by website')}
        value={_filter}
        withLabel={false}
      />
      <div className='ui--InputTextMulti-columns'>
        <div className='ui--InputTextMulti-column'>
          <label>{valueLabel}</label>
          <div className='ui--InputTextMulti-items'>
            {selected.map((text): React.ReactNode => (
              <Selected
                key={text}
                onDeselect={_onDeselect}
                text={text}
              />
            ))}
          </div>
        </div>
        <div className='ui--InputTextMulti-column'>
          <label>{availableLabel}</label>
          <div className='ui--InputTextMulti-items'>
            {isLoading
              ? <Spinner />
              : (
                available.map((text) => (
                  <Available
                    filter={filter}
                    isHidden={selected?.includes(text)}
                    key={text}
                    onSelect={_onSelect}
                    text={text}
                  />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(InputTextMulti)`
  border-top-width: 0px;
  margin-left: 2rem;
  width: calc(100% - 2rem);

  .ui--InputTextMulti-Input {
    .ui.input {
      margin-bottom: 0.25rem;
      opacity: 1 !important;
    }
  }

  .ui--InputTextMulti-columns {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;

    .ui--InputTextMulti-column {
      display: flex;
      flex-direction: column;
      min-height: 15rem;
      max-height: 15rem;
      width: 50%;
      padding: 0.25rem 0.5rem;

      .ui--InputTextMulti-items {
        padding: 0.5rem 0;
        background: var(--bg-input);
        border: 1px solid rgba(34,36,38,0.15);
        border-radius: 0.286rem 0.286rem;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;


        > div {
          padding: 0.5rem 0.75rem;
          margin: 0.125rem;
          border: 1px solid transparent;
          border-radius: 0.25rem;

          cursor: pointer;

          &:hover {
            border-color: #ccc;
          }
        }
      }
    }
  }
`);
