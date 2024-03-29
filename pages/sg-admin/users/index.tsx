import { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { AdminLayout } from "../../../resources/layouts/AdminLayout";
import { ComponentLoader } from "../../../_common/components/loader/ComponentLoader";
import { usersAdminStore } from "../../../resources/admin/users/_stores/usersAdminStore";
import { TUser } from "../../../resources/users/_models/UserMdl";
import { ResourcesProvider } from "../../../resources/admin/_stores/ResourcesContext";
import { ResourcesStore } from "../../../resources/admin/_stores/ResourcesStore";

const FAKE_COLUMNS = [
  {
    key: "lastName",
    label: "Nom"
  },
  {
    key: "firstName",
    label: "Prénom"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "role",
    label: "Rôle"
  },
  {
    key: "_id",
    label: "ID"
  }
];

const UsersAdminDashboard = () => {
  return (
    <>
      <ComponentLoader<TUser>
        endPoint={usersAdminStore.listEndPoint()}
        render={(data) => {
          usersAdminStore.setItems(data?.data.items!);
          const resourcesStore = new ResourcesStore<TUser>("users", data?.data.items, usersAdminStore);

          return (
            <ResourcesProvider store={resourcesStore}>
              <TableComponent columns={FAKE_COLUMNS} />
            </ResourcesProvider>
          );
        }}
      />
    </>
  );
};

UsersAdminDashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default UsersAdminDashboard;
