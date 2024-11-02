import { getLinks, saveLinks } from "../manager.js";

export async function DeleteFeed(args = []) {
  if (args.length === 0) {
    console.log("\n  Usage: del <index>\n");
    return;
  }

  const index = parseInt(args[0]);
  const feeds = await getLinks();

  if (isNaN(index) || index < 0 || index >= feeds.length) {
    console.log("\n  Invalid index!\n");
    return;
  }

  feeds.splice(index, 1);
  await saveLinks(feeds);
  console.log("\n  Feed deleted successfully!\n");
}
