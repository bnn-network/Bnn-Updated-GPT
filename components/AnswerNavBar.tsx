'use client'
import React from 'react'

export type TabType = 'Answer' | 'Media' | 'Sources'

interface AnswerNavBarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const AnswerNavBar: React.FC<AnswerNavBarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs: TabType[] = ['Answer', 'Media', 'Sources']

  return (
    <div className="flex border-b border-gray-700 mb-4">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default AnswerNavBar
