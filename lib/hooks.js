import { useDispatch, useSelector, useStore } from "react-redux"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppStore = useStore.withTypes()

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
