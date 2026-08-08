import { createContext, useContext } from 'react'

export type RouterValue = {
  path: string
  navigate: (to: string) => void
  /**
   * How many client-side navigations have happened in this page load. Zero on
   * first paint, both on the server and after hydration, so it is safe to key
   * render output off it. Home uses it to keep its entrance choreography a
   * first-load event rather than something that replays on every return.
   */
  navCount: number
}

export const RouterContext = createContext<RouterValue>({
  path: '/',
  navigate: () => {},
  navCount: 0,
})

export function useRouter() {
  return useContext(RouterContext)
}
