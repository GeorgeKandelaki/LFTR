import styled from "styled-components";
import Row from "../../../shared/components/Row";
import Input from "../../../shared/components/Input";

import { useState } from "react";

const StyledLogin = styled.div`
    margin-top: 12.8rem;

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
    gap: 3.2rem;
`;

const Icon = styled.div``;

const Label = styled.label``;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <StyledLogin>
            <div>
                <Icon></Icon>
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
                <Row direction="vertical">
                    <Label>Email Address</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@workout.com"
                    />
                </Row>
                <Row direction="vertical">
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                    />
                </Row>
            </StyledForm>
        </StyledLogin>
    );
}

export default Login;
