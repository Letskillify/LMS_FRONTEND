import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Bell, X, Calendar, Clock, AlertCircle } from "lucide-react"
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { useGetNoticeBoardsByInstituteIdQuery } from '../../Redux/Api/noticeBoardSlice';
const NoticeBoard = () => {
    const [noticeBoard, setNoticeBoard] = useState([]);
    const { InstituteId, Class, Course } = getCommonCredentials();
    const { data: noticeBoardData } = useGetNoticeBoardsByInstituteIdQuery(InstituteId, {
        skip: !InstituteId,
    })
    useEffect(() => {
        setNoticeBoard(noticeBoardData)
    }, [noticeBoardData])

    const handleDownload = (fileUrl) => {
        if (!fileUrl) {
            console.error("No file URL provided");
            return;
        }

        // Create an anchor element
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "attachment"); // Set default file name
        link.target = "_blank"; // Open in a new tab if necessary

        // Append to body and trigger click
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between">
                    <h2 className="">Notice Board</h2>
                </div>
                <hr className="m-0" />
                <motion.div className="notification-grid mt-3">
                    {noticeBoard?.map((noticedata) => (
                        <motion.div
                            key={noticedata.id || ""}
                            className={`notification text-${noticedata.targetAudienceType?.toLowerCase() === 'teachingstaff' ? 'primary' : noticedata.targetAudienceType?.toLowerCase() === 'nonteachingstaff' ? 'success' : noticedata.targetAudienceType?.toLowerCase() === 'studentprofile' ? 'info' : noticedata.targetAudienceType?.toLowerCase() === 'classes' ? 'warning' : noticedata.targetAudienceType?.toLowerCase() === 'courses' ? 'danger' : noticedata.targetAudienceType?.toLowerCase() === 'coursegroup' ? 'dark' : noticedata.targetAudienceType?.toLowerCase() === 'courseboards' ? 'secondary' : ''}`}
                        >
                            <div className="notification-content">
                                <h2 className="notification-title">{noticedata.title || "N/A"}</h2>
                                <p className="notification-description">{noticedata.description || "N/A"}</p>
                                <div className="notification-meta">
                                    <div className="notification-meta-item">
                                        <Calendar className="notification-meta-icon" />
                                        <span className="notification-meta-text">Posted: {new Date(noticedata.datePosted).toLocaleDateString() || "N/A"}</span>
                                    </div>
                                    <div className="notification-meta-item">
                                        <Clock className="notification-meta-icon" />
                                        <span className="notification-meta-text">Valid till: {new Date(noticedata.validTill).toLocaleDateString() || "N/A"}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="notification-status justify-content-between text-center d-md-flex flex-wrap d-inline">
                                    <div className={`mt-1 text-dark ${noticedata.status === 'Active' ? 'text-success' : noticedata.status === 'Expired' ? 'text-danger' : noticedata.status === 'Draft' ? 'text-warning' : 'text-muted'}`}>
                                        <AlertCircle className="notification-status-icon" />
                                        <span className="notification-status-text">{noticedata.status || "N/A"}</span>
                                    </div>
                                    <div className="mt-1 text-dark">
                                        Audience Type :
                                        <span className="notification-status-text ms-2">{noticedata?.isNoticeForAll ? "All" : noticedata?.targetAudienceType || "N/A"}</span>
                                    </div>
                                    <div className="mt-1 text-dark">
                                        Attachment :
                                        <span className="notification-status-text cursor-pointer ms-2" onClick={() => noticedata?.attachment && handleDownload(noticedata?.attachment || "")}>Download</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default NoticeBoard
