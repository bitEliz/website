import { Plugin } from "@nuxt/types";
import { initializeAxios } from "~/utils/http";

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
};

export default accessor;
