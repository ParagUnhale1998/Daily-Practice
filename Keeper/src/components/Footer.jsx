import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear;
   
  return (
    <p style={{position : 'absolute', textAlign : 'center', bottom: '0',width: '100%'}}>
        Copyright @ {currentYear}
    </p>
  )
}
