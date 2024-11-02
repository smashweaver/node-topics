import { getLinks } from "../manager.js";

export async function ListFeeds() {
  const feeds = await getLinks();

  if (feeds.length === 0) {
    console.log("\n  There are no feeds yet!\n");
    return;
  }

  console.log("\n  Here are your feeds:");
  feeds.forEach((feed, index) => {
    console.log(`  ${index}: ${feed}`);
  });
  console.log("");
}
