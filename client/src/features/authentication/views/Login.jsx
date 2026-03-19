import styled from "styled-components";
import Row from "../../../shared/components/Row";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { useNavigate } from "react-router";

import { useState } from "react";

const StyledLogin = styled.div`
    margin: 12.8rem 1rem 2.4rem 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2.4rem;
`;

const StyledForm = styled.form`
    padding: 4rem 3.2rem;
    border-radius: 1rem;
    background-color: var(--color-neutral-800);
    border: 1px solid var(--color-border-subtle);
    box-shadow: 0 0 2rem 1px var(--color-neutral-1000);

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2.4rem;

    max-width: 45rem;
    width: 100%;
`;

const Icon = styled.div`
    border-radius: 1.4rem;
    letter-spacing: 0;
    justify-self: center;
    background-color: var(--color-neutral-700);
    padding: 1.2rem 1.4rem 1rem 1.4rem;
    margin-bottom: 1.2rem;
`;

const Label = styled.label`
    font-weight: 500;
`;

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const navigate = useNavigate();

    return (
        <StyledLogin>
            <div>
                <Icon>
                    <BiSolidCircleThreeQuarter size="50" color="var(--color-accent-500)" />
                </Icon>
                <h1 style={{ textAlign: "center" }}>Welcome Back</h1>
                <p
                    style={{
                        color: "var(--color-text-secondary)",
                        fontWeight: "500",
                        width: "30rem",
                        textAlign: "center",
                    }}
                >
                    Focus on your progress. Log in to track your performance.
                </p>
            </div>

            <StyledForm>
                <FormRow>
                    <Label>Email Address</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@workout.com"
                    />
                </FormRow>

                <FormRow>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                    />
                </FormRow>

                <Row>
                    <Input
                        type="checkbox"
                        value={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.value)}
                        style={{ width: "2.4rem" }}
                    />

                    <Label>Keep me Signed In</Label>
                </Row>

                <Button style={{ width: "100%" }}>Sign In</Button>
            </StyledForm>

            <Row>
                <p style={{ color: "var(--color-text-secondary)", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <span
                        style={{ color: "var(--color-accent-500)", fontWeight: "600", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Create Account
                    </span>
                </p>
            </Row>
        </StyledLogin>
    );
}

export default Login;
