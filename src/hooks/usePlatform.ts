import { useContext } from 'react';
import { OSType, platform } from '../lib/platform';
import { SSRContext } from '../lib/SSR';

export function usePlatform(): OSType {
  const ssrContext = useContext(SSRContext);
  return ssrContext.platform || platform();
}

export default usePlatform;
