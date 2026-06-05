import styled from "styled-components";
import Button from "./Button";
import { FaBolt } from "react-icons/fa6";

const StyledSidebar = styled.div``;

const Icon = styled.div`
    background-color: var(--color-accent-500);
    padding: 6px 8px;
    border-radius: 9px;
    line-height: 1;
`;
const Name = styled.p`
    font-size: 1.8rem;
    font-weight: 700;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

const SidebarNav = styled.div`
    & ul {
    }

    & li {
    }
`;

const SidebarFooter = styled.div``;

const Avatar = styled.div``;
const AvatarImg = styled.div``;
const AvatarUser = styled.p``;

function Sidebar() {
    return (
        <StyledSidebar>
            <SidebarHeader>
                <Icon>
                    <FaBolt color="#fff" size="2.4rem" />
                </Icon>
                <div>
                    <Name>LFTR</Name>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "1.4rem", fontWeight: "600" }}>
                        Stay Consistent
                    </p>
                </div>
            </SidebarHeader>
            <SidebarNav>
                <ul>
                    <li>Dashboard</li>
                    <li>Workouts</li>
                    <li>History</li>
                    <li>Profile</li>
                </ul>
            </SidebarNav>
            <SidebarFooter>
                <Button size="medium">+ New Workout</Button>
                <Avatar>
                    <AvatarImg>
                        <img src="placeholder_url" alt="User's profile img" />
                    </AvatarImg>
                    <AvatarUser></AvatarUser>
                </Avatar>
            </SidebarFooter>
        </StyledSidebar>
    );
}

export default Sidebar;
