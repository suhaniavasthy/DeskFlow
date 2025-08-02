import * as React from "react"

// Define a mobile screen width threshold (in pixels)
const MOBILE_BREAKPOINT = 768

// Custom React hook that determines if the current screen is considered "mobile"
export function useIsMobile() {
  // Declare state to track if the viewport is mobile-sized; initially undefined
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Use useEffect to attach a media query listener when the component mounts
  React.useEffect(() => {
    // Create a MediaQueryList object that matches screen widths below the mobile threshold
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Handler to update the state based on current window size
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add the listener to detect changes in screen width
    mql.addEventListener("change", onChange)

    // Set the initial state based on current window width
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup function: remove the event listener on unmount
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array ensures this runs once on mount

  // Return a boolean indicating whether the screen is mobile-sized
  // Using `!!isMobile` ensures the result is always a boolean
  return !!isMobile
}
