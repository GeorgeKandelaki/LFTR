import styled from "styled-components";

const StyledPreview = styled.div`
    box-shadow: 0 0 2rem 5px var(--color-neutral-1000);
    border-radius: 2rem;
    margin: 12rem 1.2rem 14.6rem 1.2rem;
`;

const PreviewHeader = styled.div`
    padding: 2rem 2.2rem 1.6rem 2.2rem;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    background-color: var(--color-neutral-700);
    border-bottom: 1px solid var(--color-border-subtle);

    display: flex;
    align-items: center;
    gap: 1rem;
`;

const PreviewMain = styled.div`
    padding: 4rem 4.8rem;
`;

const Dot = styled.span`
    padding: 5px;
    border-radius: 50%;
    background-color: var(--color-neutral-600);
`;

const Img = styled.img`
    display: block;
    height: auto;
`;

function Preview({ videoURL, imageURL, width = "800", height = "320" }) {
    return (
        <StyledPreview>
            <PreviewHeader>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
            </PreviewHeader>

            <PreviewMain>
                {imageURL && <Img src={imageURL} width={width} height={height} alt="Preview Image" />}

                {videoURL && (
                    <video width={width} height={height} loop autoPlay muted>
                        <source src={videoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </PreviewMain>
        </StyledPreview>
    );
}

export default Preview;
