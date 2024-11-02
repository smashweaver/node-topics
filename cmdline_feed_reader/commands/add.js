import { getLinks, saveLinks } from "../manager.js";

export async function AddFeed(args = []) {
  if (args.length === 0) {
    console.log("\n  Usage: add <url>\n");
    return;
  }

  const url = args[0];
  try {
    // Basic URL validation
    new URL(url);

    const feeds = await getLinks();

    // Check if URL already exists
    if (feeds.includes(url)) {
      console.log("\n  This feed already exists!\n");
      return;
    }

    feeds.push(url);
    await saveLinks(feeds);
    console.log("\n  Feed added successfully!\n");
  } catch (error) {
    console.log("\n  Invalid URL format\n");
  }
}
