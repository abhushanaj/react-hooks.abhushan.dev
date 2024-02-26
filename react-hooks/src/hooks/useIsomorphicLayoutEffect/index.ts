import React from 'react';

import { isWindow } from '../../utils';

/**
 * useIsomorphicLayoutEffect () -  Custom react hook that provides an isomorphic (server/client) version of either
 * `useLayoutEffect` or `useEffect` based on the execution environment.
 * @see - https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useisomorphiclayout/
 **/
const useIsomorphicLayoutEffect = isWindow() ? React.useLayoutEffect : React.useEffect;

export { useIsomorphicLayoutEffect };
