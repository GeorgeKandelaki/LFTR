function Row({ direction = "horizontal", gap = "10px", children, styles }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: `${direction === "vertical" ? "column" : "row"}`,
                gap,
                // width: "100%",
                ...styles,
            }}
        >
            {children}
        </div>
    );
}

export default Row;
