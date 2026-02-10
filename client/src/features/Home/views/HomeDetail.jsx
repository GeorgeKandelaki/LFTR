import styled from "styled-components";

const StyledHomeDetail = styled.div``;

function HomeDetail() {
    return (
        <StyledHomeDetail>
            <header>
                <div>{/* LOGO */}</div>
                <nav>
                    <ul>
                        <li>Features</li>
                        <li>Science</li>
                        <li>Pricing</li>
                    </ul>
                </nav>
                <div>
                    <button>Login</button>
                    <button>Sign up</button>
                </div>
            </header>

            <main>
                <section>{/* HERO SECTION */}</section>
                <section>{/* Features */}</section>

                <section>{/* Preview */}</section>
            </main>

            <footer>
                <div>{/* LOGO */}</div>

                <nav>
                    <ul>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Twitter</li>
                    </ul>
                </nav>

                <p>&copy; {new Date().getFullYear()} Pulse Tracking. All rights reserved.</p>
            </footer>
        </StyledHomeDetail>
    );
}

export default HomeDetail;
