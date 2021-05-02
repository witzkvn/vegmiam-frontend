import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertOverlayPopup from "../../components/AlertOverlayPopup/AlertOverlayPopup";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { closeOverlayMessageAction, openOverlayMessageAction } from "../../redux/layout/layout-actions";
import { updateMyPasswordAtion, updateUserAtion } from "../../redux/user/user-actions";
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

  const [password, setPassword] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

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

  const handlePasswordUpdate = async (e) => {
    setPasswordError(null);
    setIsPasswordLoading(true);
    e.preventDefault();
    try {
      await dispatch(updateMyPasswordAtion(password));
      dispatch(openOverlayMessageAction());
    } catch (error) {
      setPasswordError(error?.response?.data?.message || "Merci de vérifier les champs renseignés.");
    }
    setIsPasswordLoading(false);
  };

  return (
    <>
      <AlertOverlayPopup>
        <p>Vous devez rafraichir la page pour prendre cette modification en compte.</p>
        <CustomButton
          level="primary"
          onClick={() => {
            document.location.reload();
            dispatch(closeOverlayMessageAction());
          }}
        >
          Rafraichir
        </CustomButton>
      </AlertOverlayPopup>
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

        <form className="form-group" onSubmit={handlePasswordUpdate}>
          <label>
            <h2>Changer le mot de passe</h2>
          </label>
          <div className="form-group">
            <label htmlFor="passwordCurrent">Mot de passe actuel :</label>
            <input
              type="password"
              id="passwordCurrent"
              required
              value={password.passwordCurrent}
              onChange={(e) =>
                setPassword((prevState) => {
                  return { ...prevState, passwordCurrent: e.target.value };
                })
              }
            />
            <label htmlFor="password">Nouveau mot de passe :</label>
            <input
              type="password"
              id="password"
              required
              value={password.password}
              onChange={(e) =>
                setPassword((prevState) => {
                  return { ...prevState, password: e.target.value };
                })
              }
            />
            <label htmlFor="passwordConfirm">Confirmer nouveau mot de passe :</label>
            <input
              type="password"
              id="passwordConfirm"
              required
              value={password.passwordConfirm}
              onChange={(e) =>
                setPassword((prevState) => {
                  return { ...prevState, passwordConfirm: e.target.value };
                })
              }
            />
            <CustomButton level="secondary">{isPasswordLoading ? "En cours..." : "Valider"}</CustomButton>
          </div>
          {passwordError && <p className="error-text">Erreur : {passwordError}</p>}
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
