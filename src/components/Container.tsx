import React from 'react'

export const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div style={{ margin: "0 auto",  maxWidth: "1100px", width: "100%", position: "relative"}}>{children}</div>
  )
}
