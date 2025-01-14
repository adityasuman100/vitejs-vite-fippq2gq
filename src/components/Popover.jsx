// File: Popover.js
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popover.css';

const Popover = ({ content, children, position = 'top', trigger = 'click' }) => {

    // <div style={{ marginTop: '20px' }}>
    //             <Popover
    //                 content="Hovered Popover"
    //                 position="right"
    //                 trigger="hover"
    //             >
    //                 <button>Hover Over Me</button>
    //             </Popover>
    //         </div>
    const [isVisible, setIsVisible] = useState(false);
    const popoverRef = useRef(null);

    const togglePopover = () => setIsVisible((prev) => !prev);

    const showPopover = () => setIsVisible(true);

    const hidePopover = () => setIsVisible(false);

    const handleOutsideClick = (event) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target)
        ) {
            hidePopover();
        }
    };

    useEffect(() => {
        if (trigger === 'click') {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [trigger]);

    const getPopoverClass = () => {
        return `popover-content ${position}`;
    };

    const eventHandlers =
        trigger === 'click'
            ? { onClick: togglePopover }
            : trigger === 'hover'
            ? { onMouseEnter: showPopover, onMouseLeave: hidePopover }
            : trigger === 'focus'
            ? { onFocus: showPopover, onBlur: hidePopover }
            : {};

    return (
        <div className="popover-wrapper" {...eventHandlers} ref={popoverRef}>
            <div className="popover-trigger">{children}</div>
            {isVisible && <div className={getPopoverClass()}>{content}</div>}
        </div>
    );
};

Popover.propTypes = {
    content: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
};

export default Popover;
