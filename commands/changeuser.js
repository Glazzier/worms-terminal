export default function changeuser(args) {
  if (args.length !== 1) {
    return "Usage: changeuser [new_username]\nChanges the current user.";
  }

  const newUsername = args[0];
  localStorage.setItem("username", newUsername);

  return `Username changed to: ${newUsername}`;
}
