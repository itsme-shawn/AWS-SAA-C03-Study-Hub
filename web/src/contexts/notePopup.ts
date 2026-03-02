import { createContext, useContext } from 'react'

export interface NotePopupContextValue {
  open: (sectionId: string, headingId: string, anchor: DOMRect, containerRect?: DOMRect) => void
}

export const NotePopupContext = createContext<NotePopupContextValue | null>(null)

export function useNotePopup() {
  return useContext(NotePopupContext)
}
