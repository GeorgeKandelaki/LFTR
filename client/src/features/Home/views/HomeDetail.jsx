import styled from "styled-components";

import Preview from "../../../shared/components/Preview";
import Row from "../../../shared/components/Row";
import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";

const StyledHomeDetail = styled.div`
    padding: 2.4rem 1.8rem;
`;

const Hero = styled.section`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Description = styled.p`
    font-size: 1.8rem;
    color: var(--color-text-secondary);
    font-weight: 600;

    margin-bottom: 4rem;
`;

const Watermark = styled.div`
    display: flex;
    justify-content: center;
    color: var(--color-text-secondary);
    margin-bottom: 4.8rem;

    & p {
        border: 1px solid var(--color-border-strong);
        border-radius: 2rem;
        padding: 5px 1.2rem;
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 600;

        display: inline-flex;
        align-items: center;
        gap: 1rem;
    }

    & span {
        padding: 6px;
        background-color: var(--color-accent-600);
        border-radius: 50%;
    }
`;

const Features = styled.section``;

function HomeDetail() {
    return (
        <>
            <StyledHomeDetail>
                <Header />
                <Watermark>
                    <p>
                        <span></span>
                        Minimalist Tracking V2.0
                    </p>
                </Watermark>

                <main>
                    <Hero>
                        {/* HERO SECTION */}
                        <Row direction="vertical">
                            <h1 style={{ fontSize: "12.8rem", letterSpacing: "-6px", lineHeight: "1.2" }}>Pulse</h1>

                            <Description>
                                Train with intention, track without noise. <br />
                                The workout companion built for clarity.
                            </Description>
                        </Row>

                        <Row gap="1.6rem">
                            <Button>Start your journey &rarr;</Button>
                            <Button variation="secondary">View Demo</Button>
                        </Row>
                    </Hero>

                    <Features>{/* Features */}</Features>

                    <Preview>{/* Preview */}</Preview>
                </main>
            </StyledHomeDetail>
            <Footer />
        </>
    );
}

export default HomeDetail;
