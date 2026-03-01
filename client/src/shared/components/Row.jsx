import styled from "styled-components";

function Row({ direction = "horizontal", gap = "10px", children }) {
    return (
        <div style={{ display: "flex", flexDirection: `${direction === "vertical" ? "column" : "row"}`, gap }}>
            {children}
        </div>
    );
}

export default Row;
