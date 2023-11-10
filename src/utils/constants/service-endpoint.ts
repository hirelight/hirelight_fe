const ORGANIZATIONS = "/organizations";
const ORGANIZATIONS_EMPLOYER = "/organizations/employers";

const EMAIL_TEMPLATE = "/email-templates";
const EMAIL_TEMPLATE_TYPES = "email-template-types";

const ASSESSMENT_FLOW_TEMPLATES = "/assessment-flow-templates";

const ASSESSMENT_FLOWS = "/assessment-flows";

const ASSESSMENTS = "/assessments";

const IDENTITY = "/identity";
const IDENTITY_GET_INFO = `${IDENTITY}/info`;

const JOBPOSTS = "/jobposts";

const JOBPOSTS_PERMISSION = "/job-posts/permissions";
const PERMISSION = "/permissions";

const QUESTION_ANSWER_SETS = "/question-answer-sets";

const ROLES = "/roles";
const TAGS = "/tags";

const QUESTION_ANSWERS = "/question-answers";

const endpoints = {
    TAGS,
    ORGANIZATIONS,
    ORGANIZATIONS_EMPLOYER,
    JOBPOSTS,
    QUESTION_ANSWERS,
    EMAIL_TEMPLATE,
    EMAIL_TEMPLATE_TYPES,
    IDENTITY,
    IDENTITY_GET_INFO,
    ASSESSMENTS,
    ASSESSMENT_FLOWS,
    ASSESSMENT_FLOW_TEMPLATES,
    JOBPOSTS_PERMISSION,
    PERMISSION,
    QUESTION_ANSWER_SETS,
    ROLES,
};

export default endpoints;
