import Parser from "rss-parser";
import { getLinks } from "../manager.js";
import { open } from "../util.js";

async function displayRssFeed(feed, numEntries) {
  console.log("\n" + "=".repeat(50));
  console.log(`Feed: ${feed.title}`);
  console.log(`Description: ${feed.description || "N/A"}`);
  if (feed.link) console.log(`Website: ${feed.link}`);
  console.log("=".repeat(50));

  console.log("\nRecent entries:");
  feed.items.slice(0, numEntries).forEach((item, i) => {
    console.log(`\n${i + 1}. ${item.title}`);

    const date = item.pubDate || item.isoDate;
    if (date) {
      const formattedDate = new Date(date).toLocaleString();
      console.log(`   Published: ${formattedDate}`);
    }

    if (item.link) console.log(`   Link: ${item.link}`);

    if (item.contentSnippet) {
      const preview = item.contentSnippet
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);
      console.log(
        `   Preview: ${preview}${preview.length >= 150 ? "..." : ""}`,
      );
    }
  });

  console.log("\n" + "=".repeat(50) + "\n");
}

async function openInBrowser(url) {
  try {
    // Store the child process reference
    await open(url, { wait: false });
    console.log(`\n  Opening in browser: ${url}\n`);
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: `Failed to open URL in browser: ${error.message}`,
    };
  }
}
async function tryParseRssFeed(url) {
  try {
    const parser = new Parser({
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader Bot/1.0)",
      },
      timeout: 5000,
    });

    const feed = await parser.parseURL(url);
    return { feed, error: null };
  } catch (error) {
    return {
      feed: null,
      error: `Failed to parse RSS feed: ${error.message}`,
    };
  }
}

export async function OpenFeed(args = []) {
  if (args.length === 0) {
    console.log("\n  Usage: open <index> [number_of_entries]\n");
    return;
  }

  const index = parseInt(args[0]);
  const numEntries = args[1] ? parseInt(args[1]) : 5;
  const feeds = await getLinks();

  if (isNaN(index) || index < 0 || index >= feeds.length) {
    console.log("\n  Invalid index!\n");
    return;
  }

  const url = feeds[index];
  const controller = new AbortController();

  try {
    // Set overall timeout for the entire operation
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    // Try RSS feed first
    const { feed, error: rssError } = await tryParseRssFeed(url);

    if (!rssError && feed) {
      await displayRssFeed(feed, numEntries);
      clearTimeout(timeoutId);
      return;
    }

    // If RSS parsing fails, try opening in browser
    const { success, error: browserError } = await openInBrowser(url);

    // Show browser error if it failed
    if (!success) {
      console.log(`\n  ${browserError}\n`);
    }

    clearTimeout(timeoutId);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("\n  Operation timed out\n");
    } else {
      console.log(`\n  Unexpected error: ${error.message}\n`);
    }
  } finally {
    // Cleanup
    controller.abort(); // Ensure any pending operations are cancelled
  }
}
