import styled from "styled-components";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { useState } from "react";

const StyledOptions = styled.div``;

const Option = styled.div``;

const OpenButton = styled.button``;

const OptionsBox = styled.div``;

function Options({ options, positionStyles }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledOptions>
            <OpenButton onClick={() => setIsOpen((prev) => !prev)}>
                <PiDotsThreeOutlineVertical />
            </OpenButton>

            {isOpen && (
                <OptionsBox style={{ ...positionStyles }}>
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
