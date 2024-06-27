'use client'

import React, { useState, useEffect } from 'react'
import { FacebookShare } from 'react-share-kit'
// import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
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

  //   const shareButtons: ShareButtonProps[] = [
  //     { network: 'twitter', icon: FaTwitter },
  //     { network: 'linkedin', icon: FaLinkedin },
  //     { network: 'facebook', icon: FaFacebook },
  //     { network: 'instagram', icon: FaInstagram, url: 'https://instagram.com' }
  //   ]

  return (
    <div>
      <button onClick={toggleModal} className="bg-black-500 px-4 py-2 rounded">
        Share
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
            <div className="flex space-x-4 mb-6">
              {/* {shareButtons.map((btn, index) => (
                <ShareButton
                  key={index}
                  {...btn}
                  url={currentUrl}
                  className="text-white p-2 bg-gray-700 rounded-full"
                />
              ))} */}
              <FacebookShare url={currentUrl} quote="FaceBook" />
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
