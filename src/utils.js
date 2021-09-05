export const getStylesForCard = (done, importance) => {
  if (done) {
    return 'card card--unactive';
  } else if (importance) {
    return 'card card--important';
  } else {
    return 'card';
  }
}

export const setBackgroundColor = (evt, classname, color) => {
  if (evt.currentTarget.classList.contains(classname)) {
    evt.currentTarget.style.backgroundColor = color;
  }
}