'use client'

import React, { useState } from 'react'
import AnswerNavBar, { TabType } from './AnswerNavBar'
import { Section } from '@/components/section'
import { BotMessage } from '@/components/message'
import { StreamableValue } from 'ai/rsc'

interface AnswerSectionProps {
  content: StreamableValue<string>
}

const AnswerSection: React.FC<AnswerSectionProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Answer')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  return (
    <div className="bg-gray-900 text-white rounded-lg">
      <AnswerNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'Answer' && (
        <Section title="Answer">
          <BotMessage content={content} />
        </Section>
      )}
      {activeTab === 'Media' && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Media</h2>
          {/* Add your media content here */}
        </div>
      )}
      {activeTab === 'Sources' && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Sources</h2>
          {/* Add your sources content here */}
        </div>
      )}
    </div>
  )
}

export default AnswerSection
