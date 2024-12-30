import { useEffect, useState } from "react"

const useHover = (tagRef: React.RefObject<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		const tagRefCurrent = tagRef.current;
		if(!tagRefCurrent) return;
		const handleMouseEnter = (): void => setIsHovering(true);
		const handleMouseLeave = (): void => setIsHovering(false);
		tagRefCurrent.addEventListener('mouseenter', handleMouseEnter);
		tagRefCurrent.addEventListener('mouseleave', handleMouseLeave);
		return () => {
      tagRefCurrent.removeEventListener('mouseenter', handleMouseEnter);
      tagRefCurrent.removeEventListener('mouseleave', handleMouseLeave);
    };
	}, [tagRef])
	return isHovering;
}

export default useHover