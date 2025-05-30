import { useEffect } from 'react';

export function useClearShortcut(setInput: (value: string) => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const isClearShortcut =
                (isMac && e.metaKey && e.key === 'k') ||
                (!isMac && e.ctrlKey && e.key === 'k');

            if (isClearShortcut) {
                e.preventDefault();
                setInput('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setInput]);
}
