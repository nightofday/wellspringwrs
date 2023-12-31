import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="graph-4"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/orders"
        icon="basket"
        title="Orders"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/customers"
        icon="people"
        title="Customers"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/products"
        icon="barcode"
        title="Products"
        fontIcon="bi-layers"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Reports
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/sales/pages"
        title="Sales"
        fontIcon="bi-archive"
        icon="graph-up"
      >
        <SidebarMenuItem
          to="/sales/pages/daily"
          title="Daily"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            SETTINGS
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/apps/user-management/users"
        icon="user"
        title="Users"
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };
