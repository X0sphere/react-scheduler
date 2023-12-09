import { cloneElement, createContext, useContext, useEffect, useState } from "react";
import { isTabPort } from "../utils/helpers";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Create a React context to manage the state and behavior of the sidebar
const SidebarContext = createContext();

// SidebarProvider: A component that provides the context values to its descendants
function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close the sidebar on outside click
  const close = () => isTabPort() && setIsOpen(false);

  useEffect(() => {
    // Handle resize events to show/hide sidebar based on screen size
    const handleResize = () => {
      if (!isTabPort()) {
        setIsOpen(true);
      }
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle the state of the sidebar (open/close)
  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  // Provide the context values to its descendants
  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar: A component responsible for rendering the sidebar based on the `isOpen` state
function Sidebar({ children }) {
  const { isOpen, close } = useContext(SidebarContext);

  // Ref to detect clicks outside the sidebar to close it
  const ref = useOutsideClick(close);

  return <>{isOpen ? cloneElement(children, { ref: ref }) : null}</>;
}

// CloseSidebar: A component that can be used to wrap elements inside the sidebar
// Automatically closes the sidebar when the wrapped element is clicked
function CloseSidebar({ children }) {
  const { close } = useContext(SidebarContext);
  return <>{cloneElement(children, { onClick: close })}</>;
}

// Attach CloseSidebar and Sidebar components to SidebarProvider for easier import
SidebarProvider.CloseSidebar = CloseSidebar;
SidebarProvider.Sidebar = Sidebar;

// useSidebar: A custom hook to access the context values
function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside of SidebarProvider");
  return context;
}

// Export SidebarProvider and useSidebar for use in other parts of the application
export { SidebarProvider, useSidebar };
