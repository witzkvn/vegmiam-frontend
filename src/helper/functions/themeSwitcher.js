const root = document.documentElement;

const getBlackColors = () => {
  const bgBlackLight = getComputedStyle(root).getPropertyValue("--bg-black-light");
  const bgBlackMedium = getComputedStyle(root).getPropertyValue("--bg-black-medium");
  const bgBlackDark = getComputedStyle(root).getPropertyValue("--bg-black-dark");
  return [bgBlackLight, bgBlackMedium, bgBlackDark];
}

const getWhiteColors = () => {
  const bgWhiteLight = getComputedStyle(root).getPropertyValue("--bg-white-light");
  const bgWhiteMedium = getComputedStyle(root).getPropertyValue("--bg-white-medium");
  const bgWhiteDark = getComputedStyle(root).getPropertyValue("--bg-white-dark");
  return [bgWhiteLight, bgWhiteMedium, bgWhiteDark];
}

const getTextColors = () => {
  const textWhite = getComputedStyle(root).getPropertyValue("--text-white");
  const textGrey = getComputedStyle(root).getPropertyValue("--text-grey");
  const textBlack = getComputedStyle(root).getPropertyValue("--text-black");
  return [textWhite, textGrey, textBlack]
}

const getPrimaryColors = () => {
  const primaryMedium = getComputedStyle(root).getPropertyValue("--primary-medium");
  return [primaryMedium]
}

export const toggleDarkTheme = (theme) => {
  const [bgWhiteLight, bgWhiteMedium, bgWhiteDark] = getWhiteColors();
  const [bgBlackLight, bgBlackMedium, bgBlackDark] = getBlackColors();
  const [textWhite, textGrey, textBlack] = getTextColors();

  if (theme && theme === "light") {
    root.style.setProperty("--bg-light", bgWhiteLight);
    root.style.setProperty("--bg-medium", bgWhiteMedium);
    root.style.setProperty("--bg-dark", bgWhiteDark);
    root.style.setProperty("--text-color", textBlack);
  } else if (theme && theme === "dark") {
    root.style.setProperty("--bg-light", bgBlackLight);
    root.style.setProperty("--bg-medium", bgBlackMedium);
    root.style.setProperty("--bg-dark", bgBlackDark);
    root.style.setProperty("--text-color", textWhite);
  } else {
    return
  }
}

export const changePrimaryColors = (hexCode) => {
  if (!hexCode) return
  const checkHexCode = /^#[0-9a-fA-F]{6}/.test(hexCode);
  if (checkHexCode) {

    const newPrimaryLight = lightenDarkenColor(hexCode, 20);
    const newPrimaryDark = lightenDarkenColor(hexCode, -20);

    root.style.setProperty("--primary-light", newPrimaryLight);
    root.style.setProperty("--primary-medium", hexCode);
    root.style.setProperty("--primary-dark", newPrimaryDark);
  }
}


const lightenDarkenColor = (hexCode, value) => {

  var usePound = false;

  if (hexCode[0] === "#") {
    hexCode = hexCode.slice(1);
    usePound = true;
  }

  var num = parseInt(hexCode, 16);

  var r = (num >> 16) + value;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + value;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + value;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}




