// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';
import type { Registry } from '@polkadot/types/types';

import CID from 'cids';
import { useMemo } from 'react';

import { useApi } from '@polkadot/react-hooks';
import { u8aConcat } from '@polkadot/util';

function createCid (registry: Registry, cidStr: string): Cid | null {
  try {
    const _cid = new CID(cidStr);

    return registry.createType('Cid', {
      codec: registry.createType('u64', _cid.code),
      multihash: registry.createType(
        'CidMultihash',
        u8aConcat(
          registry.createType('u64', _cid.multihash.slice(0, 1)).toU8a(),
          registry.createType('u8', _cid.multihash.slice(1, 2)).toU8a(),
          _cid.multihash.slice(2)
        )
      ),
      version: registry.createType('CidVersion', _cid.version)
    });
  } catch (error: any) {
    return null;
  }
}

export function useCidEncode (cid?: Cid | null): string | null {
  if (!cid || cid.isEmpty) {
    return null;
  }

  const cidStr = new CID(
    cid.version.isV0 ? 0 : 1,
    cid.codec.toNumber(),
    cid.multihash.toMultihash()
  );

  return cidStr.toString();
}

export function useCidDecode (cidStr?: string | null): Cid | null {
  const { api } = useApi();

  return useMemo((): Cid | null => {
    if (!cidStr) {
      return null;
    }

    return createCid(api.registry, cidStr);
  }, [api.registry, cidStr]);
}
