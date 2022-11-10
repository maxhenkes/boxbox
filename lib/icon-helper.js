import { GoDatabase, GoServer } from "react-icons/go";
import { FiHardDrive } from "react-icons/fi";
import { get } from "lodash";

const icons = {
  server: GoServer,
  database: GoDatabase,
  storage: FiHardDrive,
};

export const getIcon = (icon) => {
  return get(icons, icon, GoServer);
};
