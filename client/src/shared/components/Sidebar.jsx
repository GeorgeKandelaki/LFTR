import styled from "styled-components";
import Button from "./Button";
import useCheckAuthentication from "../hooks/useCheckAuthentication";

import { FaHistory, FaUser } from "react-icons/fa";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FaBolt } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const StyledSidebar = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    max-width: 35rem;
`;

const SidebarContainer = styled.div`
    position: initial;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #111621;
    border-right: 1px solid var(--color-border-strong);
    transition: all 0.3s;

    &.closed {
        transform: translateX(-120%);
    }
`;

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
    border-bottom: 1px solid var(--color-border-strong);
    padding: 2.8rem 2rem 2rem 2rem;
`;

const SidebarNav = styled.div`
    padding: 2.8rem 2rem;
    margin-bottom: auto;

    & ul {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1.4rem;
    }

    & li {
        width: 100%;

        color: var(--color-text-secondary);
        font-weight: 500;
        font-size: 1.8rem;
        padding: 1.2rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;

        & a {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        &:hover {
            transform: scale(1.05);
        }
    }
`;

const SidebarFooter = styled.div`
    border-top: 1px solid var(--color-border-strong);
    padding: 2.8rem 2rem 2rem 2rem;
    width: 100%;
`;

const Avatar = styled.div`
    margin-top: 2rem;

    display: flex;
    align-items: center;
    gap: 2.4rem;
`;
const AvatarImg = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    outline: 3px solid var(--color-accent-300);
    overflow: hidden;

    &img {
        width: 100%;
    }
`;
const AvatarUser = styled.p`
    /* font-size: 1.6rem; */
    font-weight: 500;
`;
const AvatarUserMembership = styled.p`
    color: var(--color-text-secondary);
    font-weight: 600;
    font-size: 1.4rem;
`;

const OpenButton = styled.button`
    position: absolute;
    top: 4rem;

    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    transition: all 0.3s;

    ${({ $isOpen = true }) => ($isOpen ? "transform: translateX(1300%);" : "transform: translateX(30%);")}
`;

const sidebarNav = [
    { route: "/dashboard", label: "Dashboard", icon: MdDashboard },
    { route: "/workouts", label: "Workouts", icon: CgGym },
    { route: "/history", label: "History", icon: FaHistory },
    { route: "/profile", label: "Profile", icon: FaUser },
];

function Sidebar() {
    const { user } = useCheckAuthentication();
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <StyledSidebar>
            <OpenButton onClick={() => setIsOpen((prev) => !prev)} $isOpen={isOpen}>
                <PiDotsThreeOutlineVertical color="var(--color-accent-600)" size="2.4rem" />
            </OpenButton>
            <SidebarContainer className={isOpen ? "" : "closed"}>
                <SidebarHeader>
                    <Icon>
                        <FaBolt color="#fff" size="2.5rem" />
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
                        {sidebarNav.map((item) => (
                            <li
                                key={item.label}
                                style={{ backgroundColor: pathname === item.route ? "#172748" : "initial" }}
                            >
                                <Link to={item.route}>
                                    {<item.icon size="3rem" />}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SidebarNav>
                <SidebarFooter>
                    <Button size="medium" style={{ width: "100%" }}>
                        + New Workout
                    </Button>
                    <Avatar>
                        <AvatarImg>
                            <img src={`http://localhost:5000/static/avatars/${user.avatar}`} alt="User's profile img" />
                        </AvatarImg>
                        <div>
                            <AvatarUser>{user.name}</AvatarUser>
                            <AvatarUserMembership>Free Member</AvatarUserMembership>
                        </div>
                    </Avatar>
                </SidebarFooter>
            </SidebarContainer>
        </StyledSidebar>
    );
}

// Would have been a better approach. TODO: In the future refactor/migrate to this type of solution.
// Sidebar.OpenButton = OpenButton;
// Sidebar.SidebarContainer = SidebarContainer;

export default Sidebar;
