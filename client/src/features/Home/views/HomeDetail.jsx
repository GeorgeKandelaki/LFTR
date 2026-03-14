import styled from "styled-components";

import Preview from "../../../shared/components/Preview";
import Row from "../../../shared/components/Row";
import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";

import { GiCheckedShield } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { RiCollageFill } from "react-icons/ri";

import PreviewImage from "../../../../static/screen.png";

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

const Features = styled.section`
    display: flex;
    align-items: top;
    justify-content: center;
    gap: 1.8rem;
    flex-wrap: wrap;

    margin-top: 12rem;
`;

const Feature = styled.div`
    border: 1px solid var(--color-border-strong);
    border-radius: 1rem;
    padding: 2.4rem 3rem;
    text-align: center;
    max-width: 35rem;
    box-shadow: 0 0 1rem var(--color-neutral-1000);
`;

const FeatureIcon = styled.div`
    display: inline-block;
    background-color: var(--color-neutral-700);

    margin-bottom: 1.2rem;
    padding: 1.4rem;
    border-radius: 1rem;
    line-height: 0;
`;

const FeatureHeading = styled.h3`
    font-size: 1.8rem;
`;

const FeatureDescription = styled.p`
    font-size: 1.4rem;
    color: var(--color-text-secondary);
`;

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

                <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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

                    <Features>
                        {/* Features */}
                        <Feature>
                            <FeatureIcon>
                                <RiCollageFill color="var(--color-accent-500)" size="2rem" />
                            </FeatureIcon>

                            <FeatureHeading>Clean UI</FeatureHeading>
                            <FeatureDescription>Optimized for rapid logging without distractions.</FeatureDescription>
                        </Feature>
                        <Feature>
                            <FeatureIcon>
                                <MdAnalytics color="var(--color-accent-500)" size="2rem" />
                            </FeatureIcon>
                            <FeatureHeading>Pure Data</FeatureHeading>
                            <FeatureDescription>
                                Deep insights into your volume and progressive overload.
                            </FeatureDescription>
                        </Feature>
                        <Feature>
                            <FeatureIcon>
                                <GiCheckedShield color="var(--color-accent-500)" size="2rem" />
                            </FeatureIcon>
                            <FeatureHeading>Privacy First</FeatureHeading>
                            <FeatureDescription>
                                Your data is yours. Secure, encrypted and offline-ready.
                            </FeatureDescription>
                        </Feature>
                    </Features>

                    {/* Preview */}
                    <Preview imageURL={PreviewImage} width="1100" />
                </main>
            </StyledHomeDetail>
            <Footer />
        </>
    );
}

export default HomeDetail;
