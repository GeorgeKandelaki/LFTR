import styled from "styled-components";
import Button from "./Button";

import { FaHistory, FaUser } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { Link, useLocation } from "react-router";

const StyledSidebar = styled.div`
    height: 100%;
    background-color: #111621;
    border-right: 1px solid var(--color-border-strong);
    max-width: 30rem;
    width: 100%;

    display: flex;
    flex-direction: column;
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
`;
const AvatarImg = styled.div``;
const AvatarUser = styled.p``;

const sidebarNav = [
    { route: "/dashboard", label: "Dashboard", icon: MdDashboard },
    { route: "/workouts", label: "Workouts", icon: CgGym },
    { route: "/history", label: "History", icon: FaHistory },
    { route: "/profile", label: "Profile", icon: FaUser },
];

function Sidebar() {
    const { pathname } = useLocation();

    return (
        <StyledSidebar>
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
                    {/* <li>
                        <Link to="/dashboard">
                            <MdDashboard size="3rem" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/workouts">
                            <CgGym size="3rem" />
                            <span>Workouts</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/history">
                            <FaHistory size="3rem" />
                            <span>History</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <FaUser size="3rem" />
                            <span>Profile</span>
                        </Link>
                    </li> */}
                </ul>
            </SidebarNav>
            <SidebarFooter>
                <Button size="medium" style={{ width: "100%" }}>
                    + New Workout
                </Button>
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
