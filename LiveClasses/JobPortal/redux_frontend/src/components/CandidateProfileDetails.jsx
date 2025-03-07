import { useSelector } from "react-redux";

function CandidateProfileDetails() {
    const { profile } = useSelector((state) => state.user);

    return (
        <>
            {profile ? (
                <div>
                    <h2>Details of {profile.firstName}</h2>
                    <p>FirstName : {profile.firstName}</p>
                    <p>LastName : {profile.lastName}</p>
                    <p>Mobile : {profile.mobileNumber}</p>
                    <p>Address : {profile.address}</p>
                </div>
            ) : (
                <p>No user data found</p>
            )}
        </>
    );
}

export default CandidateProfileDetails;
