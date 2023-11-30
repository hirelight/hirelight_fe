import React from "react";

import styles from "./styles.module.scss";

const OrgDetailLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.layout_wrapper}>{children}</div>;
};

export default OrgDetailLayout;
