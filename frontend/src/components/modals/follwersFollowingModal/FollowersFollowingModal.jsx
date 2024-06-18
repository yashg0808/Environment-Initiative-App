import { ButtonTypes } from "../../../constants";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import Button from "../../basic/Button";
import Modal from "../../basic/Modal";

const FollowersFollowingModal = ({ followers, following, type, hideModal }) => {
  const navigate = useCustomNavigate();
  return (
    <Modal
      heading={type === "followers" ? "Followers" : "Following"}
      className="w-[95%] lg:w-1/3"
    >
      <div className="flex flex-col gap-y-6 mt-2">
        {type === "followers"
          ? followers.map((follower) => (
              <div
                key={follower._id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                  navigate(`/u?profile=${follower.username}`);
                  hideModal();
                }}
              >
                <img
                  src={follower.avatar.url}
                  alt="follower"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">@{follower.username}</p>
              </div>
            ))
          : following.map((follow) => (
              <div
                key={follow._id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                  navigate(`/u?profile=${follow.username}`);
                  hideModal();
                }}
              >
                <img
                  src={follow.avatar.url}
                  alt="follower"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">{follow.username}</p>
              </div>
            ))}
        <Button
          type={ButtonTypes.primaryButton}
          onClickHandler={hideModal}
          className="w-full"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default FollowersFollowingModal;
