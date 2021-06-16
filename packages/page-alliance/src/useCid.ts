// Copyright 2017-2021 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Cid } from '@polkadot/types/interfaces';

import CID from 'cids';
import multihash, { HashCode } from 'multihashes';
import { useMemo } from 'react';

import { useApi } from '@polkadot/react-hooks';

export function useCidEncode (cid?: Cid | null): string | null {
  if (!cid || cid.isEmpty) {
    return null;
  }

  const cidStr = new CID(
    cid.version.isV0 ? 0 : 1,
    cid.codec.toNumber(),
    multihash.encode(
      cid.multihash.digest.toU8a(),
      cid.multihash.codec.toNumber() as HashCode,
      cid.multihash.size1.toNumber()
    )
  );

  return cidStr.toString();
}

export function useCidDecode (cidStr?: string | null): Cid | null {
  const { api } = useApi();

  return useMemo((): Cid | null => {
    if (!cidStr) {
      return null;
    }

    try {
      const registry = api.registry;

      const _cid = new CID(cidStr);

      const decoded = multihash.decode(_cid.multihash);

      return registry.createType('Cid', {
        codec: registry.createType('u64', _cid.code),
        multihash: registry.createType('CidMultihash', {
          codec: registry.createType('u64', decoded.code),
          digest: registry.createType('Raw', decoded.digest),
          size1: registry.createType('u8', decoded.length)
        }),
        version: registry.createType('CidVersion', _cid.version)
      });
    } catch (error: any) {
      return null;
    }
  }, [api.registry, cidStr]);
}
