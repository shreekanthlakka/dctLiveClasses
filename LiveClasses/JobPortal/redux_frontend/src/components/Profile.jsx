import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileFormCandidate from "./ProfileFormCandidate";
import CandidateProfileDetails from "./CandidateProfileDetails";
import RecruiterProfileDetails from "./RecruiterProfileDetails";
import ProfileFormRecruiter from "./ProfileFormRecruiter";

function Profile() {
    const { profile, userAccount } = useSelector((state) => state.user);
    const [editProfile, setEditProfile] = useState(false);

    return (
        <div>
            {Object.keys(profile).length === 0 && (
                <div>
                    <h2>Add your profile</h2>
                    <button onClick={() => setEditProfile((e) => !e)}>
                        Add your profile
                    </button>
                </div>
            )}
            {Object.keys(profile).length > 0 &&
                userAccount.role === "candidate" && (
                    <>
                        <CandidateProfileDetails />
                        <button onClick={() => setEditProfile((e) => !e)}>
                            Edit Profile
                        </button>
                    </>
                )}

            {Object.keys(profile).length > 0 &&
                userAccount.role === "recruiter" && (
                    <>
                        <RecruiterProfileDetails />
                        <button onClick={() => setEditProfile((e) => !e)}>
                            Edit Profile
                        </button>
                    </>
                )}

            {editProfile && userAccount.role === "candidate" && (
                <ProfileFormCandidate
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
