type headerType = {
  Authorization: string;
};

export const PROXMOX_URL = process.env.PROXMOX_URL;

export const header: headerType = {
  Authorization:
    "PVEAPIToken=root@pam!testToken=e24d7c9a-97cf-4fda-8f3f-e6ad6a4cc344",
};

export const getNodesURL = PROXMOX_URL + "/api2/json/nodes/";

export const getVersionURL = PROXMOX_URL + "/api2/json/version";
