import { useState } from "react";
import { getCourseUrl } from "../api/urls";
import axios from "axios";

export const useUser = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userCourse, setCourse] = useState("");
    const [userRole, setRole] = useState("");
    const [userProfilePic, setProfilePic] = useState("");
    const [courseMissing, setCourseMissing] = useState(false);

    const updateUserInfo = (userObj) => {
        setUserEmail(userObj.email);
        setProfilePic(userObj.imageUrl);
        setUserName(userObj.name);
    };

    const getUserDetails = async () => {
        const res = await axios.post(getCourseUrl, { email: userEmail });
        if (res.status === 200) {
            const course = res.data;
            if (course) {
                setCourse(course.name);
                console.log(course.name);
                return;
            }
        } else if (res.status === 404) {
            setCourseMissing(true);
            return;
        } else {
            console.log(res);
        }
    };

    return {
        userName,
        userProfilePic,
        userCourse,
        userRole,
        userEmail,
        courseMissing,
        updateUserInfo,
        getUserDetails,
    };
};
