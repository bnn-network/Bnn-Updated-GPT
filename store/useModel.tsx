import { create } from 'zustand'

interface ModelStore {
  selectedModel: string
  setSelectedModel: (model: string) => void
}

const useModel = create<ModelStore>(set => ({
  selectedModel: 'gpt-3.5-turbo',
  setSelectedModel: model => set({ selectedModel: model })
}))

export default useModel
