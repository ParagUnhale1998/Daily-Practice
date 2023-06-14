import  { useContext } from 'react'
import videoDispatchContext from '../useContext/VideoDispatch'

export default function useVideoDispatch() {
 
    return useContext(videoDispatchContext)
}
