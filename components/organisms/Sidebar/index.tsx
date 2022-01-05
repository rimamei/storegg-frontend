import Footer from "./Footer";
import MenuItem from "./MenuItem";
import Profile from "./Profile";

interface SidebarProps {
  activeMenu:
    | "overview"
    | "transaction"
    | "settings"
    | "message"
    | "card"
    | "rewards"
    | "logout";
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Overview"
            icon="overview"
            active={activeMenu === "overview"}
            href="/member"
          />
          <MenuItem
            title="Transactions"
            icon="transaction"
            active={activeMenu === "transaction"}
            href="/member/transactions"
          />
          <MenuItem
            title="Messages"
            icon="messages"
            active={activeMenu === "message"}
            href="/member"
          />
          <MenuItem
            title="Card"
            icon="cards"
            active={activeMenu === "card"}
            href="/member"
          />
          <MenuItem
            title="Rewards"
            icon="rewards"
            active={activeMenu === "rewards"}
            href="/member"
          />
          <MenuItem
            title="Settings"
            icon="settings"
            active={activeMenu === "settings"}
            href="/member/edit-profile"
          />
          <MenuItem
            title="Log Out"
            icon="logout"
            active={activeMenu === "logout"}
            href="/sign-in"
          />
        </div>
        <Footer />
      </div>
    </section>
  );
}
