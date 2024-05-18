// ==== DOM ============
export { useDocumentTitle } from './hooks/useDocumentTitle';
export type { DocumentTitleOptions, UseDocumentTitleOptions } from './hooks/useDocumentTitle';
export { useIsDocumentVisible } from './hooks/useIsDocumentVisible';
export { useDocumentEventListener } from './hooks/useDocumentEventListener';

// ======= Window =======
export { useWindowSize } from './hooks/useWindowSize';
export type { UseWindowSizeResult } from './hooks/useWindowSize';
export { useOuterWindowSize } from './hooks/useOuterWindowSize';
export type { UseOuterWindowSizeResult } from './hooks/useOuterWindowSize';
export { useWindowEventListener } from './hooks/useWindowEventListener';

// ===== BOM ==========
export { useOnline } from './hooks/useOnline';
export { useNavigatorLanguage } from './hooks/useNavigatorLanguage';
export { useCopyToClipboard } from './hooks/useCopyToClipboard';

// ====== State ===========
export { usePrevious } from './hooks/usePrevious';
export { useToggle } from './hooks/useToggle';
export { useDefault } from './hooks/useDefault';
export { useCounter } from './hooks/useCounter';
export type { UseCounterOptions } from './hooks/useCounter';
export { useQueue } from './hooks/useQueue';
export { useList } from './hooks/useList';
export { useStack } from './hooks/useStack';
export { useCycleOn } from './hooks/useCycleOn';
export { useStateWithHistory } from './hooks/useStateWithHistory';
export { useUndoState } from './hooks/useUndoState';

// ===== Storage ===========

// ======== UI ==========
export { useLockBodyScroll } from './hooks/useLockBodyScroll';
export { useEventListenerOnRef } from './hooks/useEventListenerOnRef';
export { useMediaQuery } from './hooks/useMediaQuery';

// ========= Effects and Lifecycles
export { useOnMount } from './hooks/useOnMount';
export { useOnUnmount } from './hooks/useOnUnmount';
export { useEffectOnlyOnceWhen } from './hooks/useEffectOnlyOnceWhen';
export { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect';
export { useOnUpdate } from './hooks/useOnUpdate';

// ============== Timers ========
export { useInterval } from './hooks/useInterval';
export { useTimeout } from './hooks/useTimeout';
export { useIntervalWhen } from './hooks/useIntervalWhen';

// ========= Utilities ==========
export { useDebouncedValue } from './hooks/useDebouncedValue';
export { useWasSSR } from './hooks/useWasSSR';
export { useIsClient } from './hooks/useIsClient';
export { useFreshRef } from './hooks/useFreshRef';
export { useFreshCallback } from './hooks/useFreshCallback';
export { useLifecycleLogger } from './hooks/useLifecycleLogger';
export { useSampleCallback } from './hooks/useSampleCallback';
export { useLimitCallback } from './hooks/useLimitCallback';
export { useDebounce } from './hooks/useDebounce';
export { useThrottle } from './hooks/useThrottle';
export { useDispatchCustomEvent } from './hooks/useDispatchCustomEvent';
export { useSubscribeToCustomEvent } from './hooks/useSubscribeToCustomEvent';
