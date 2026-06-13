import styled from "styled-components";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

const StyledOptions = styled.div``;

const Option = styled.div`
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    transition: opacity 0.2s;
    padding: 6px 0;

    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const OpenButton = styled.button`
    background-color: transparent;
    border: none;
`;

const OptionsBox = styled.div`
    padding: 1.2rem 1.8rem;
    background-color: var(--color-neutral-1000);
    border-radius: 1rem;
    border: 1px solid var(--color-border-strong);
    z-index: 1;

    & > div:not(:last-child) {
        border-bottom: 1px solid var(--color-border-strong);
    }
`;

function Options({ options, positionCSS, positionBoxCSS, closeOutsideClick = true }) {
    const [isOpen, setIsOpen] = useState(false);

    const wrapperRef = useRef(null);

    const { position, top, right, transform } = positionCSS;

    const boxPosition = { top: Number(top.replace(/\D+/g, "")), right: Number(right.replace(/\D+/g, "")) };

    function handleOutsideClick(e) {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target)) setIsOpen(false);
    }

    useEffect(
        function () {
            if (!closeOutsideClick || !isOpen) return;

            document.addEventListener("click", handleOutsideClick);

            return () => document.removeEventListener("click", handleOutsideClick);
        },
        [closeOutsideClick, isOpen],
    );

    return (
        <StyledOptions ref={wrapperRef}>
            <OpenButton style={{ ...positionCSS }} onClick={() => setIsOpen((prev) => !prev)}>
                <PiDotsThreeOutlineVertical color="var(--color-accent-600)" size="2.4rem" />
            </OpenButton>

            {isOpen && (
                <OptionsBox
                    style={{
                        ...positionBoxCSS,
                    }}
                >
                    {options.map((option) => (
                        <Option
                            key={option.label}
                            onClick={() => {
                                option.onClick();
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </Option>
                    ))}
                </OptionsBox>
            )}
        </StyledOptions>
    );
}

export default Options;
