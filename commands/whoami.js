export default function whoami(args) {
  if (args.length !== 0) {
    return "Usage: whoami\nDisplays the current user.";
  }

  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    return storedUsername;
  } else {
    return "No user set. Use 'changeuser' command to set user.";
  }
}