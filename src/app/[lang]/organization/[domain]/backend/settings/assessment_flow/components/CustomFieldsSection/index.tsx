import React from "react";

import pageStyles from "../../styles.module.scss";

const CustomFieldsSection = () => {
    return (
        <section className={pageStyles.section__wrapper}>
            <h2 className={pageStyles.section__title}>
                Canidate Custom Fields
            </h2>

            <div className={pageStyles.section__content__wrapper}>
                <div className="p-6">
                    <div className="mb-4">
                        <h4 className={`${pageStyles.content__h4}`}>
                            Manage your account’s candidate custom fields
                        </h4>
                        <p className={pageStyles.content__subheading}>
                            Edit, disable or change the order of the custom
                            fields that appear in the candidate profile and
                            application form.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomFieldsSection;
