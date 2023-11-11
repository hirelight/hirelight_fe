"use client";

import Image from "next/image";
import React from "react";

import faceToFace from "/public/images/face-to-face-assessment.png";
import oneWay from "/public/images/one-way-assessment.png";
import testAssessment from "/public/images/test-assessment.png";

import { useParams, useRouter } from "next/navigation";

import { IAssessmentDto } from "@/services";

import styles from "./PipelineConfigAssessment.module.scss";

type PipelineConfigAssessmentProps = {
    selectedStage?: IAssessmentDto;
};

const PipelineConfigAssessment: React.FC<PipelineConfigAssessmentProps> = ({
    selectedStage,
}) => {
    const router = useRouter();
    const { flowId } = useParams();
    return (
        <div className="w-full px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                <button
                    type="button"
                    className={styles.assessment__wrapper}
                    onClick={() => {
                        if (!selectedStage) return;
                        router.push(
                            `${flowId}/config-assessment/${selectedStage.id}/face-to-face-assessment/new`
                        );
                    }}
                >
                    <Image
                        src={faceToFace}
                        alt="Assessment"
                        className="h-16 w-auto object-contain mb-4"
                    />
                    <h5 className={styles.assessment__title}>Face to Face</h5>
                    <p className={styles.assessment__description}>
                        Thêm bộ công cụ phỏng vấn từ các mẫu hoặc công việc hiện
                        có để sử dụng trong các cuộc phỏng vấn để đánh giá.
                    </p>
                </button>
                <button
                    type="button"
                    className={styles.assessment__wrapper}
                    onClick={() => {
                        if (!selectedStage) return;
                        router.push(
                            `${flowId}/config-assessment/${selectedStage.id}/one-way-assessment/new`
                        );
                    }}
                >
                    <Image
                        src={oneWay}
                        alt="Assessment"
                        className="h-16 w-auto object-contain mb-4"
                    />
                    <h5 className={styles.assessment__title}>
                        One way interview
                    </h5>
                    <p className={styles.assessment__description}>
                        Tạo và áp dụng quy trình đánh giá phỏng vấn video có cấu
                        trúc.
                    </p>
                </button>
                <button
                    type="button"
                    className={`${styles.assessment__wrapper} ${
                        selectedStage &&
                        [
                            "LIVE_VIDEO_INTERVIEW_ASSESSMENT",
                            "ASYNC_VIDEO_INTERVIEW_ASSESSMENT",
                        ].includes(selectedStage.assessmentTypeName)
                            ? "cursor-not-allowed opacity-50"
                            : ""
                    } transition-opacity`}
                    onClick={() => {
                        if (!selectedStage) return;
                        router.push(
                            `${flowId}/config-assessment/${selectedStage.id}/multiple-choice-assessment/new`
                        );
                    }}
                >
                    <Image
                        src={testAssessment}
                        alt="Assessment"
                        className="h-16 w-auto object-contain mb-4"
                    />
                    <h5 className={styles.assessment__title}>Test kit</h5>
                    <p className={styles.assessment__description}>
                        Đánh giá mức độ phù hợp của ứng viên với công việc và
                        đưa ra quyết định tuyển dụng khách quan dựa trên dữ
                        liệu.
                    </p>
                </button>
            </div>
        </div>
    );
};

export default PipelineConfigAssessment;
