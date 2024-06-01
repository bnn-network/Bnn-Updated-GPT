import { create } from 'zustand'

interface ModelStore {
  selectedModel: string
  setSelectedModel: (model: string) => void
}

const useModel = create<ModelStore>(set => ({
  selectedModel: 'gpt-4o',
  setSelectedModel: model => set({ selectedModel: model })
}))

export default useModel
