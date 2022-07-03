import React, { useState, useEffect } from "react";
import ServerError from "../components/contents/serverError";

export default function PageComponent({ PageLayout, PageContent, pageData, setPageData }) {
    if (pageData.hasError) {
        return (
            <PageLayout>
                <ServerError err={pageData} />
            </PageLayout>
        );
    }

    if (pageData.status === "loading") {
        return (
            <PageLayout>
                <div className="loading-page">
                    <h1>Carregando...</h1>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout pageData={pageData}>
            <PageContent pageData={pageData} />
        </PageLayout>
    );
}
