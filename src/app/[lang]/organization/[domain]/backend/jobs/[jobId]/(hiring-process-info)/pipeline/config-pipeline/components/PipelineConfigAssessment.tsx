"use client";

import Image from "next/image";
import React from "react";

import faceToFace from "/public/images/face-to-face-assessment.png";
import oneWay from "/public/images/one-way-assessment.png";
import testAssessment from "/public/images/test-assessment.png";

import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./PipelineConfigAssessment.module.scss";

const PipelineConfigAssessment = () => {
    const { assessmentId } = useParams();
    return (
        <div className="w-full px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                <Link
                    href={`config-pipeline/123/face-to-face-assessment/new`}
                    className={styles.assessment__wrapper}
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
                </Link>
                <Link
                    href={`config-pipeline/123/one-way-assessment/new`}
                    className={styles.assessment__wrapper}
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
                </Link>
                <Link
                    href={`config-pipeline/123/multiple-choice-assessment/new`}
                    className={styles.assessment__wrapper}
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
                </Link>
            </div>
        </div>
    );
};

export default PipelineConfigAssessment;
