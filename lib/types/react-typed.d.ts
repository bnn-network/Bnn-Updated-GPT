declare module 'react-typed' {
  import React from 'react'

  export interface TypedProps {
    strings: string[]
    typeSpeed?: number
    backSpeed?: number
    backDelay?: number
    startDelay?: number
    smartBackspace?: boolean
    shuffle?: boolean
    loop?: boolean
    loopCount?: number
    showCursor?: boolean
    cursorChar?: string
    fadeOut?: boolean
    fadeOutDelay?: number
    onComplete?: (self: any) => void
    onStringTyped?: (arrayPos: number, self: any) => void
    onLastStringBackspaced?: (self: any) => void
    onTypingPaused?: (arrayPos: number, self: any) => void
    onTypingResumed?: (arrayPos: number, self: any) => void
    onReset?: (self: any) => void
    onStop?: (arrayPos: number, self: any) => void
    onStart?: (arrayPos: number, self: any) => void
    className?: string
    style?: React.CSSProperties
  }

  export default class Typed extends React.Component<TypedProps> {}
}
