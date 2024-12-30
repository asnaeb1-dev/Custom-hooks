import { useEffect, useState } from "react"
/*
	DONT pass tagRef.current as it might chnage and cause various re-renders and might lead to mulitple
	reattachments of event listener.
*/
const useEventListener = (tagRef: React.RefObject<HTMLElement>, eventType: string) => {
  const [eventData, setEventData] = useState<Event | null>(null);
  useEffect(() => {
		const tagRefCurrent = tagRef.current as HTMLElement;
    if(!tagRefCurrent || !eventType) return;
		const handleEvent = (e: Event) => setEventData(e);
    tagRefCurrent.addEventListener(eventType, handleEvent);
		return () => tagRefCurrent.removeEventListener(eventType, handleEvent);
  }, [tagRef, eventType])

	return eventData
}

export default useEventListener