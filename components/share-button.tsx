'use client'

import React, { useState, useEffect } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from 'react-share'
import {
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaArrowUp
} from 'react-icons/fa'
import { Share } from 'lucide-react'
import Clip from '@/assets/icons/clip.svg'

import Image from 'next/image'

const DynamicShareButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const toggleModal = () => setShowModal(!showModal)

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex justify-center items-center rounded-full w-12 h-12 bg-modal-inputBoxSecondary"
      >
        <Share />
      </button>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
          <div className="w-[400px] h-[310px] bg-modal-background p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base">Share Answer</h2>
              <button
                onClick={toggleModal}
                className="text-text-secondary scale-150 "
              >
                &times;
              </button>
            </div>
            <p className="text-text-secondary text-sm pt-2 mb-4 border-t">
              Share via
            </p>
            <div className="flex flex-row gap-4">
              <div className="flex space-x-4 mb-6 rounded-full w-10 h-10 bg-modal-inputBoxSecondary justify-center">
                <TwitterShareButton url={currentUrl}>
                  <FaTwitter />
                </TwitterShareButton>
              </div>
              <div className="flex space-x-4 mb-6 rounded-full w-10 h-10 bg-modal-inputBoxSecondary justify-center">
                <WhatsappShareButton url={currentUrl}>
                  <FaWhatsapp />
                </WhatsappShareButton>
              </div>
              <div className="flex space-x-4 mb-6 rounded-full w-10 h-10 bg-modal-inputBoxSecondary justify-center">
                <LinkedinShareButton url={currentUrl}>
                  <FaLinkedin />
                </LinkedinShareButton>
              </div>
              <div className="flex mb-6 rounded-full w-10 h-10 bg-modal-inputBoxSecondary justify-center">
                <FacebookShareButton url={'copyLink'}>
                  <FaFacebook />
                </FacebookShareButton>
              </div>
            </div>
            <p className="text-text-secondary text-sm mb-2">or copy link</p>

            <div className="flex rounded-3xl bg-modal-inputBox text-sm p-1">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="pl-4 flex-grow truncate bg-primary"
              />
              <button
                onClick={copyLink}
                className="flex justify-center items-center w-10 h-10 bg-modal-inputBoxSecondary rounded-full"
              >
                <Image src={Clip} alt="clip icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynamicShareButton
