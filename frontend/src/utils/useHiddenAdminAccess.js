import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Project 2 secret access methods (intentionally different from Project 1):
//
// 1. Keyboard shortcut: Ctrl + Alt + P  (works on desktop)
// 2. Multi-click: clicking the navbar brand/logo 6 times within 2.5 seconds
//    (works on mobile/touch devices)
//
// No visible "Admin Login" link exists anywhere on the public site.
export const useHiddenAdminAccess = () => {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Alt + P
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        navigate('/secure-panel-q7m4-access');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleSecretMultiClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 6) {
      clickCountRef.current = 0;
      navigate('/secure-panel-q7m4-access');
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2500);
  };

  return { handleSecretMultiClick };
};
