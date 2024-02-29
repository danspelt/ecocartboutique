import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  theme: 'system',
  drawerOpen: false,
}

export const layoutStore = create(
  persist(() => initialState, {
    name: 'layoutStore',
  })
)

export default function useLayoutService() {
  const { theme, drawerOpen } = layoutStore()

  return {
    theme,
    drawerOpen,
    toggleTheme: () => {
      layoutStore.setState({
        theme: theme === 'dark' ? 'light' : 'dark',
      })
    },
    toggleDrawer: () => {
      layoutStore.setState({
        drawerOpen: !drawerOpen,
      })
    },
  }
}
