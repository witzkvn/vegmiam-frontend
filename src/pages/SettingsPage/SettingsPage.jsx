import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { updateUserAtion } from "../../redux/user/user-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";

import "./SettingsPage.scss";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const imageInput = useRef();

  const [nameInput, setNameInput] = useState(currentUser?.name);
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [nameError, setNameError] = useState(null);

  const handleAvatarUpdate = async (e, newAvatar) => {
    setAvatarError(null);
    setIsAvatarLoading(true);
    e.preventDefault();

    try {
      await dispatch(updateUserAtion({ avatar: newAvatar }));
    } catch (error) {
      setAvatarError(error?.response?.data?.message || "Merci de vérifier les champs renseignés.");
    }
    setIsAvatarLoading(false);
  };

  const handleNameUpdate = async (e) => {
    setNameError(null);
    setIsNameLoading(true);
    e.preventDefault();

    try {
      await dispatch(updateUserAtion({ name: nameInput }));
    } catch (error) {
      setNameError(error?.response?.data?.message || "Merci de vérifier les champs renseignés.");
    }
    setIsNameLoading(false);
  };

  return (
    <div className="SettingsPage pageWrapWidth">
      <h1>Paramètres</h1>

      <div className="SettingsPage__user">
        <UserAvatar imgSrc={currentUser?.avatar} />
        <h2>{currentUser?.name}</h2>
      </div>
      <form className="form-group" onSubmit={(e) => handleAvatarUpdate(e, imageInput.current.files[0])}>
        <label htmlFor="avatar">
          <h2>Changer l'avatar</h2>
        </label>
        <div className="form-group__inline-input">
          <input ref={imageInput} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" required />
          <CustomButton level="secondary">{isAvatarLoading ? "En cours..." : "Valider"}</CustomButton>
        </div>
        {avatarError && <p className="error-text">Erreur : {avatarError}</p>}
      </form>

      <form className="form-group" onSubmit={handleNameUpdate}>
        <label htmlFor="username">
          <h2>Changer le nom d'utilisateur</h2>
        </label>
        <div className="form-group__inline-input">
          <input type="text" id="username" required value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          <CustomButton level="secondary">{isNameLoading ? "En cours..." : "Valider"}</CustomButton>
        </div>
        {nameError && <p className="error-text">Erreur : {nameError}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;
