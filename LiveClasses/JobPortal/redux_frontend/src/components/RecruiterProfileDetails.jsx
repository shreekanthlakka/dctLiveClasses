import { useSelector } from "react-redux";

function RecruiterProfileDetails() {
    const { profile, userAccount } = useSelector((state) => state.user);
    return (
        <div>
            <>
                {profile ? (
                    <div>
                        <h2>Details of {userAccount.username}</h2>
                        <p>Company Name : {profile.companyName}</p>
                        <p>email : {profile.email}</p>
                        <p>Website : {profile.website}</p>
                        <p>Address : {profile.address}</p>
                    </div>
                ) : (
                    <p>No user data found</p>
                )}
            </>
        </div>
    );
}

export default RecruiterProfileDetails;
