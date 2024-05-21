import { useState } from "react";
import { useUser } from "../context/userContext";
import ProfileForm from "./ProfileForm";
import ProfileFormRecruiter from "./ProfileFormRecruiter";
import CandidateProfileDetails from "./CandidateProfileDetails";
import RecruiterProfileDetails from "./RecruiterProfileDetails";

function Profile() {
    const { profile, userAccount } = useUser();
    const [editProfile, setEditProfile] = useState(false);

    // useEffect(() => {
    //     if (!userAccount.role) return;
    //     getProfile(userAccount.role)
    //         .then((res) => {
    //             if (res.success) {
    //                 dispatch({ type: "SET_PROFILE", payload: res.data });
    //                 toast.success(res.message);
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error(err.message);
    //         });
    // }, [userAccount]);

    return (
        <div>
            {!profile && (
                <div>
                    <h2>Add your profile</h2>
                    <button onClick={() => setEditProfile((e) => !e)}>
                        Add your profile
                    </button>
                </div>
            )}
            {profile && userAccount.role === "candidate" && (
                <>
                    <CandidateProfileDetails />
                    <button onClick={() => setEditProfile((e) => !e)}>
                        Edit Profile
                    </button>
                </>
            )}

            {profile && userAccount.role === "recruiter" && (
                <>
                    <RecruiterProfileDetails />
                    <button onClick={() => setEditProfile((e) => !e)}>
                        Edit Profile
                    </button>
                </>
            )}

            {editProfile && userAccount.role === "candidate" && (
                <ProfileForm
                    setEditProfile={setEditProfile}
                    editProfile={editProfile}
                />
            )}
            {editProfile && userAccount.role === "recruiter" && (
                <ProfileFormRecruiter
                    setEditProfile={setEditProfile}
                    editProfile={editProfile}
                />
            )}
        </div>
    );
}

export default Profile;
