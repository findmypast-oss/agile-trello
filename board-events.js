export function cardListChanged(mutation) {
  return (
    mutation.type === "childList" &&
    mutation.target.classList.contains("list-cards")
  );
}
export function cardChanged(mutation) {
  return (
    mutation.type === "childList" &&
    mutation.target.classList.contains("list-card")
  );
}
export function cardTitleChanged(mutation) {
  return (
    mutation.type === "childList" &&
    mutation.target.classList.contains("list-card-title")
  );
}

export function cardLinkChanged(changedElement) {
  return (
    changedElement.target.classList.contains("list-card") &&
    changedElement.type === "attributes" &&
    changedElement.attributeName === "href"
  );
}
