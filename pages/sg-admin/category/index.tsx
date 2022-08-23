import React, { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { RegularAdminLayout } from "../../../resources/layouts/RegularAdminLayout";
import { ComponentLoader } from "../../../_common/components/loader/ComponentLoader";
import { categoryAdminStore } from "../../../resources/admin/category/_stores/categoryAdminStore";
import { ResourcesStore } from "../../../resources/admin/_stores/ResourcesStore";
import { TCategoryMdl } from "../../../resources/formations/categories/_model/CategoryMdl";
import { ResourcesProvider } from "../../../resources/admin/_stores/ResourcesContext";

type Props = {};

const FAKE_COLUMNS = [
  {
    key: "_id",
    label: "ID"
  },
  {
    key: "blockTitle",
    label: "Titre du block"
  },
  {
    key: "pageTitle",
    label: "Titre de la page"
  },
  {
    key: "urlAlias",
    label: "URL alias"
  }
];

const CategoryAdminDashboard = (props: Props) => {
  return (
    <ComponentLoader<TCategoryMdl>
      endPoint={categoryAdminStore.listEndPoint()}
      render={(data) => {
        if (data) categoryAdminStore.setItems(data?.data.items);
        const resourcesStore = new ResourcesStore<TCategoryMdl>(
          "category",
          data?.data.items,
          categoryAdminStore
        );
        return (
          <ResourcesProvider store={resourcesStore}>
            <TableComponent columns={FAKE_COLUMNS} />;
          </ResourcesProvider>
        );
      }}
    />
  );
};

CategoryAdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default CategoryAdminDashboard;
