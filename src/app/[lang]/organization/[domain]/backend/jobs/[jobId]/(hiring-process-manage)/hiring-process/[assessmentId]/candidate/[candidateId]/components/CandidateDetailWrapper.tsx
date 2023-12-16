"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserMinusIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { setApplicantDetail } from "@/redux/slices/applicant-assessment-detail.slice";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";
import { fetchAssessmentFlowTemplates } from "@/redux/thunks/assessment-flow-templates.thunk";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { setAppFormTemplate } from "@/redux/slices/app-form-template.slice";

import CanididateProfileLoadingSkeleton from "./CanididateProfileLoadingSkeleton";

const CandidateDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { candidateId, lang, jobId, assessmentId } = useParams();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(
        state => state.applicantAssessmentDetail
    );
    const {
        data: appProfileDetailRes,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["applicant-assessment-detail", candidateId],
        queryFn: () =>
            applicantAssessmentDetailServices.getAppAssDetailByProfileId(
                candidateId as string
            ),
    });
    const { data: templateRes, isLoading: templateLoading } = useQuery({
        queryKey: ["appform-template"],
        queryFn: appFormTemplateServices.getDefaultAppFormTemplate,
    });

    useEffect(() => {
        if (appProfileDetailRes && templateRes) {
            if (appProfileDetailRes.data.assessmentId !== assessmentId) {
                router.push(
                    `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
                );
            } else {
                dispatch(
                    setAppFormTemplate({
                        ...templateRes.data,
                        content: JSON.parse(templateRes.data.content),
                    })
                );
                dispatch(setApplicantDetail(appProfileDetailRes.data));
            }
        }
    }, [
        appProfileDetailRes,
        assessmentId,
        dispatch,
        jobId,
        lang,
        router,
        templateRes,
    ]);

    if (isLoading || templateLoading || !isSuccess || !data)
        return <CanididateProfileLoadingSkeleton />;

    if (appProfileDetailRes.data.status === "MOVED") return <EmptyCandidate />;
    return <>{children}</>;
};

export default CandidateDetailWrapper;

const EmptyCandidate = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "hiring-process");
    return (
        <div className="flex flex-col justify-center items-center pt-[10%]">
            <div className="w-28 h-28 mb-4 text-neutral-700">
                <UserMinusIcon />
            </div>
            <p className="text-lg font-medium">{t("no_candidate_selected")}</p>
        </div>
    );
};
