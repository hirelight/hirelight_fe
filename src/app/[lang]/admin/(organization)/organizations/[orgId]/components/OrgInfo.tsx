import React from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import { Logo } from "@/icons";

import styles from "./OrgInfo.module.scss";

const OrgInfo = () => {
    const { lang } = useParams();

    return (
        <div className="w-full flex flex-col p-6">
            <section>
                <h3>
                    <Logo className="w-5 h-5 text-blue_primary_300 inline-block mr-2" />
                    <strong>Information</strong>
                </h3>

                <div className={styles.content_wrapper}>
                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Name</div>
                    <div>Hirelight Corperation</div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Subdomain</div>
                    <div>hirelight-co</div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Email</div>
                    <div>ngkien299@gmail.com</div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Industry</div>
                    <div>Software Engineer</div>
                </div>
            </section>

            <section>
                <h3>
                    <Logo className="w-5 h-5 text-blue_primary_300 inline-block mr-2" />
                    <strong>Subscription</strong>
                </h3>

                <div className={styles.content_wrapper}>
                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Plan</div>
                    <div>Standard</div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Purchase date</div>
                    <div>
                        {moment()
                            .locale(lang as string)
                            .fromNow()}
                    </div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Due date</div>
                    <div>
                        {moment()
                            .add(6, "months")
                            .locale(lang as string)
                            .format(`dddd DD MMM yyyy`)}
                    </div>

                    {/* *****************Name section***************** */}
                    <div className={styles.content_label}>Industry</div>
                    <div>Software Engineer</div>
                </div>
            </section>
        </div>
    );
};

export default OrgInfo;
